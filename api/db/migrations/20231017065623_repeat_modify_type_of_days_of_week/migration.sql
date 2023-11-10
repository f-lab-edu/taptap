/*
  Warnings:

  - The `daysOfMonth` column on the `Repeat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `daysOfWeek` column on the `Repeat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Repeat" DROP COLUMN "daysOfMonth",
ADD COLUMN     "daysOfMonth" INTEGER[],
DROP COLUMN "daysOfWeek",
ADD COLUMN     "daysOfWeek" INTEGER[];
