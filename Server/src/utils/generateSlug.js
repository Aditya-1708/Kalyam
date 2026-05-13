// src/utils/generateSlug.js

import prisma from "./prisma.js";

const slugify = (text) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const generateUniqueSlug = async (name, excludeId = null) => {
  const baseSlug = slugify(name);

  if (!baseSlug) {
    throw new Error("Unable to generate slug from product name");
  }

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingProduct = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId && {
          NOT: {
            id: excludeId,
          },
        }),
      },
    });

    if (!existingProduct) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};