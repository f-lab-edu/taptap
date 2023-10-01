/*
  Warnings:

  - You are about to drop the column `startDate` on the `Repeat` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `Repeat` table. All the data in the column will be lost.
  - Made the column `type` on table `Repeat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `interval` on table `Repeat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Repeat" DROP COLUMN "startDate",
DROP COLUMN "times",
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "interval" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "times" JSONB DEFAULT '[]';
