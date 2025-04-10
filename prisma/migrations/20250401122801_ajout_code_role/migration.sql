/*
  Warnings:

  - Made the column `name` on table `roles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `roles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL;
