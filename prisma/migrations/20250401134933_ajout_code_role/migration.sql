-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_code_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "code" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_code_fkey" FOREIGN KEY ("code") REFERENCES "roles"("code") ON DELETE SET NULL ON UPDATE CASCADE;
