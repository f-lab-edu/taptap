/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Repeat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Repeat_taskId_key" ON "Repeat"("taskId");
