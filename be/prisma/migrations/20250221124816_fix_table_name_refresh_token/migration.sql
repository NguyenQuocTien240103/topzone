/*
  Warnings:

  - You are about to drop the `refeshtokenuser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refeshtokenuser` DROP FOREIGN KEY `RefeshTokenUser_userId_fkey`;

-- DropTable
DROP TABLE `refeshtokenuser`;

-- CreateTable
CREATE TABLE `Refesh_Token_User` (
    `userId` INTEGER NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Refesh_Token_User_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refesh_Token_User` ADD CONSTRAINT `Refesh_Token_User_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
