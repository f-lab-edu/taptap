/*
  Warnings:

  - The `weekOfMonth` column on the `Repeat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Repeat" ADD COLUMN     "months" INTEGER[],
DROP COLUMN "weekOfMonth",
ADD COLUMN     "weekOfMonth" INTEGER;

-- DropEnum
DROP TYPE "WeekOfMonth";
