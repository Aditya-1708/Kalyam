import { Prisma } from "@prisma/client";
import path from "path";

import { deleteFileIfExists } from "../utils/fileHelper.js";
import { generateUniqueSlug } from "../utils/generateSlug.js";
import prisma from "../utils/prisma.js";

const PRODUCT_UPLOAD_FOLDER = "uploads/products";

const VALID_CATEGORIES = ["HUMAN", "VETERINARY"];

const parseId = (id) => {
  const parsed = Number(id);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

const buildImageRelativePath = (file) => {
  return file ? `${PRODUCT_UPLOAD_FOLDER}/${file.filename}` : null;
};

const resolveAbsolutePath = (relativePath) => {
  return path.join(process.cwd(), relativePath);
};

export const createProduct = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    if (category && !VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Category must be HUMAN or VETERINARY",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const slug = await generateUniqueSlug(name);

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug,
        image: buildImageRelativePath(req.file),
        category: category || "HUMAN",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        success: false,
        message: "Generated slug already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { search = "", category, page = 1, limit = 10 } = req.query;

    const currentPage = Number(page) > 0 ? Number(page) : 1;

    const pageLimit = Number(limit) > 0 ? Number(limit) : 10;

    const where = {
      ...(category &&
        VALID_CATEGORIES.includes(category) && {
          category,
        }),

      ...(search && {
        name: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    const total = await prisma.product.count({
      where,
    });

    const products = await prisma.product.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip: (currentPage - 1) * pageLimit,

      take: pageLimit,
    });

    return res.json({
      success: true,

      message: "Products retrieved successfully",

      data: products,

      meta: {
        total,
        page: currentPage,
        limit: pageLimit,
        pages: Math.ceil(total / pageLimit),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const { name, category } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedData = {};

    if (name !== undefined && name.trim()) {
      updatedData.name = name.trim();

      if (name.trim() !== existingProduct.name) {
        updatedData.slug = await generateUniqueSlug(name, id);
      }
    }

    if (category && VALID_CATEGORIES.includes(category)) {
      updatedData.category = category;
    }

    if (req.file) {
      updatedData.image = buildImageRelativePath(req.file);
    }

    const updatedProduct = await prisma.product.update({
      where: { id },

      data: updatedData,
    });

    if (req.file && existingProduct.image) {
      try {
        await deleteFileIfExists(resolveAbsolutePath(existingProduct.image));
      } catch (deleteError) {
        console.error(deleteError);
      }
    }

    return res.json({
      success: true,

      message: "Product updated successfully",

      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    if (product.image) {
      try {
        await deleteFileIfExists(resolveAbsolutePath(product.image));
      } catch (deleteError) {
        console.error(deleteError);
      }
    }

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
