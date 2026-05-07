import { Prisma } from "@prisma/client";

export const formatPrismaError = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          status: 409,
          message: "Unique constraint failed",
          details: error.meta?.target,
        };
      case "P2025":
        return {
          status: 404,
          message: "Record not found",
        };
      default:
        return null;
    }
  }

  return null;
};
