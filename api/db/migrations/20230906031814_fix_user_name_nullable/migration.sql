/*
  Warnings:

  - You are about to drop the column `userId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Repeat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Category` DROP FOREIGN KEY `Category_userId_fkey`;

-- AlterTable
ALTER TABLE `Category` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Repeat` ADD COLUMN `taskId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_DayOfWeekToRepeat` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DayOfWeekToRepeat_AB_unique`(`A`, `B`),
    INDEX `_DayOfWeekToRepeat_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Repeat` ADD CONSTRAINT `Repeat_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DayOfWeekToRepeat` ADD CONSTRAINT `_DayOfWeekToRepeat_A_fkey` FOREIGN KEY (`A`) REFERENCES `DayOfWeek`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DayOfWeekToRepeat` ADD CONSTRAINT `_DayOfWeekToRepeat_B_fkey` FOREIGN KEY (`B`) REFERENCES `Repeat`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
