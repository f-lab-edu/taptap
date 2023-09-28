/*
  Warnings:

  - The values [DAILY,WEEKLY,MONTHLY,YEARLY] on the enum `RepeatType` will be removed. If these variants are still used in the database, this will fail.
  - The values [FIRST,SECOND,THIRD,FOURTH,FIFTH,LAST] on the enum `WeekOfMonth` will be removed. If these variants are still used in the database, this will fail.
  - The `daysOfMonth` column on the `Repeat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DayOfWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DayOfWeekToRepeat` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RepeatType_new" AS ENUM ('Daily', 'Weekly', 'Monthly', 'Yearly');
ALTER TABLE "Repeat" ALTER COLUMN "type" TYPE "RepeatType_new" USING ("type"::text::"RepeatType_new");
ALTER TYPE "RepeatType" RENAME TO "RepeatType_old";
ALTER TYPE "RepeatType_new" RENAME TO "RepeatType";
DROP TYPE "RepeatType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WeekOfMonth_new" AS ENUM ('First', 'Second', 'Third', 'Fourth', 'Fifth', 'Last');
ALTER TABLE "Repeat" ALTER COLUMN "weekOfMonth" TYPE "WeekOfMonth_new" USING ("weekOfMonth"::text::"WeekOfMonth_new");
ALTER TYPE "WeekOfMonth" RENAME TO "WeekOfMonth_old";
ALTER TYPE "WeekOfMonth_new" RENAME TO "WeekOfMonth";
DROP TYPE "WeekOfMonth_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "_DayOfWeekToRepeat" DROP CONSTRAINT "_DayOfWeekToRepeat_A_fkey";

-- DropForeignKey
ALTER TABLE "_DayOfWeekToRepeat" DROP CONSTRAINT "_DayOfWeekToRepeat_B_fkey";

-- AlterTable
ALTER TABLE "Repeat" DROP COLUMN "daysOfMonth",
ADD COLUMN     "daysOfMonth" TEXT[];

-- DropTable
DROP TABLE "DayOfWeek";

-- DropTable
DROP TABLE "_DayOfWeekToRepeat";

-- DropEnum
DROP TYPE "DayOfWeekLabel";
