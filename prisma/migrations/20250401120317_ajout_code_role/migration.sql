/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `roles` table. All the data in the column will be lost.
  - Added the required column `roleUser` to the `roles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_code_role_fkey";

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "role",
ADD COLUMN     "roleUser" "UserRole" NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("code", "roleUser");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_code_role_fkey" FOREIGN KEY ("code", "role") REFERENCES "roles"("code", "roleUser") ON DELETE RESTRICT ON UPDATE CASCADE;
