/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `roles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code,role]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `role` on the `roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "id",
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("code", "role");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "code" TEXT NOT NULL DEFAULT 'UNKNOWN';

-- DropEnum
DROP TYPE "codeRole";

-- CreateIndex
CREATE UNIQUE INDEX "users_code_role_key" ON "users"("code", "role");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_code_role_fkey" FOREIGN KEY ("code", "role") REFERENCES "roles"("code", "role") ON DELETE RESTRICT ON UPDATE CASCADE;
