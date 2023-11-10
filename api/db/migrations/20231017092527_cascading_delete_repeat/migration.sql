-- DropForeignKey
ALTER TABLE "Repeat" DROP CONSTRAINT "Repeat_taskId_fkey";

-- AddForeignKey
ALTER TABLE "Repeat" ADD CONSTRAINT "Repeat_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
