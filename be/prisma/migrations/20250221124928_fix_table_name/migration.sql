/*
  Warnings:

  - You are about to drop the `refesh_token_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `refesh_token_user` DROP FOREIGN KEY `Refesh_Token_User_userId_fkey`;

-- DropTable
DROP TABLE `refesh_token_user`;

-- CreateTable
CREATE TABLE `Refresh_Token_User` (
    `userId` INTEGER NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Refresh_Token_User_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refresh_Token_User` ADD CONSTRAINT `Refresh_Token_User_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
