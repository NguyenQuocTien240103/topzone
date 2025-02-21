-- CreateTable
CREATE TABLE `RefeshTokenUser` (
    `userId` INTEGER NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RefeshTokenUser_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefeshTokenUser` ADD CONSTRAINT `RefeshTokenUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
