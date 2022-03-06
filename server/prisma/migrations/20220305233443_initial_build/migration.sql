-- CreateTable
CREATE TABLE `Link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `owner` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `followCount` INTEGER NOT NULL DEFAULT 0,
    `authType` ENUM('public', 'password', 'oauth2') NOT NULL DEFAULT 'public',
    `password` VARCHAR(191) NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Link_link_key`(`link`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `followCount` INTEGER NOT NULL DEFAULT 0,
    `lastAccessDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_link_fkey` FOREIGN KEY (`link`) REFERENCES `Link`(`link`) ON DELETE RESTRICT ON UPDATE CASCADE;
