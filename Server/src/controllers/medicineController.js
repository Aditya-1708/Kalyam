import { Prisma } from "@prisma/client";
import prisma from "../utils/prisma.js";

const VALID_TARGETS = ["HUMAN", "ANIMAL"];

const validateMedicinePayload = ({
  brand,
  sku,
  strength,
  threapyArea,
  target,
}) => {
  const errors = [];

  if (!brand || typeof brand !== "string") {
    errors.push("brand is required and must be a string");
  }
  if (!sku || typeof sku !== "string") {
    errors.push("sku is required and must be a string");
  }
  if (!strength || typeof strength !== "string") {
    errors.push("strength is required and must be a string");
  }
  if (
    threapyArea !== undefined &&
    threapyArea !== null &&
    typeof threapyArea !== "string"
  ) {
    errors.push("threapyArea must be a string when provided");
  }
  if (
    !target ||
    typeof target !== "string" ||
    !VALID_TARGETS.includes(target)
  ) {
    errors.push(`target must be one of: ${VALID_TARGETS.join(", ")}`);
  }

  return errors;
};

const parseId = (id) => {
  const parsed = Number(id);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};

export const createMedicine = async (req, res, next) => {
  try {
    const { brand, sku, strength, threapyArea, target } = req.body;
    const errors = validateMedicinePayload({
      brand,
      sku,
      strength,
      threapyArea,
      target,
    });
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const medicine = await prisma.medicine.create({
      data: { brand, sku, strength, threapyArea, target },
    });

    res.status(201).json({ data: medicine });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Medicine SKU must be unique",
        fields: error.meta?.target,
      });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updateMedicine = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid medicine ID" });
    }

    const { brand, sku, strength, threapyArea, target } = req.body;
    const errors = validateMedicinePayload({
      brand,
      sku,
      strength,
      threapyArea,
      target,
    });
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const medicine = await prisma.medicine.update({
      where: { id },
      data: { brand, sku, strength, threapyArea, target },
    });

    res.json({ data: medicine });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Medicine not found" });
      }
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Medicine SKU must be unique",
          fields: error.meta?.target,
        });
      }
    }
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicines = async (req, res) => {
  try {
    const { search = "", target, page = 1, limit = 10 } = req.query;

    const currentPage = Number(page);
    const pageLimit = Number(limit);

    const where = {
      ...(target && {
        target,
      }),

      ...(search && {
        OR: [
          {
            brand: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            sku: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            threapyArea: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    };

    const total = await prisma.medicine.count({
      where,
    });

    const medicines = await prisma.medicine.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * pageLimit,
      take: pageLimit,
    });

    res.status(200).json({
      success: true,
      data: medicines,
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

export const getMedicineById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid medicine ID" });
    }

    const medicine = await prisma.medicine.findUnique({
      where: { id },
    });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.json({ data: medicine });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteMedicine = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return res.status(400).json({ message: "Invalid medicine ID" });
    }

    await prisma.medicine.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ message: "Medicine not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};
