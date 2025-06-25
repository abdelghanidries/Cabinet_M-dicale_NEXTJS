import { PrismaClient } from "@prisma/client";

// Étend globalThis avec la propriété prisma
declare global {
  let prisma: PrismaClient | undefined;
}

// Création d'une instance unique de PrismaClient
export const db = globalThis.prisma ?? new PrismaClient();

// En mode développement, attache Prisma au globalThis pour éviter les multiples instances lors du hot-reload
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
