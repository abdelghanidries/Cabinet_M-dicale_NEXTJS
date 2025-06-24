/*
  Warnings:

  - Added the required column `doctorFirstName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorLastName` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorSpeciality` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_code_fkey";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "doctorFirstName" TEXT NOT NULL,
ADD COLUMN     "doctorLastName" TEXT NOT NULL,
ADD COLUMN     "doctorSpeciality" TEXT NOT NULL,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "doctorSpeciality" TEXT;
