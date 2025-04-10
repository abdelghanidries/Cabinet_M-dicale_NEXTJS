-- CreateEnum
CREATE TYPE "codeRole" AS ENUM ('ADMIN', 'Doctor', 'ADMIN_Imagery', 'ADMIN_LAB_ANALYSE');

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "lastname" TEXT,
    "code" TEXT NOT NULL,
    "password" TEXT,
    "role" "codeRole" NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);
