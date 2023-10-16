-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('0', '1', '2', '3', '4', '5', '6');

-- AlterTable
ALTER TABLE "Repeat" ADD COLUMN     "daysOfWeek" "DayOfWeek"[];
