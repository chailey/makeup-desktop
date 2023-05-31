
import { prisma } from "~/db.server";

export type { product } from "@prisma/client";

export async function getAllProducts() {
  return prisma.product.findMany();
}
