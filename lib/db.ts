import { PrismaClient } from "@prisma/client";
declare global {
    // Étend globalThis avec la propriété prisma
    let prisma: PrismaClient | undefined;
}


export const  db = globalThis.prisma || new PrismaClient();


if(process.env.NODE_ENV !== "production") globalThis.prisma = db;