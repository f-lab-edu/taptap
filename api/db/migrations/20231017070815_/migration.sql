/*
  Warnings:

  - Made the column `createdAt` on table `Repeat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Repeat` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Repeat" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
