/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleUser` on the `roles` table. All the data in the column will be lost.
  - Added the required column `roleType` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'ADMIN_Imagery', 'ADMIN_LAB_ANALYSE', 'Doctor');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_code_role_fkey";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "roleUser",
ADD COLUMN     "roleType" "RoleType" NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_code_fkey" FOREIGN KEY ("code") REFERENCES "roles"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
