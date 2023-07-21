/*
  Warnings:

  - Added the required column `barberShopId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barberShopId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `barberShopId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `barberShopId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `BarberShop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_barberShopId_fkey` FOREIGN KEY (`barberShopId`) REFERENCES `BarberShop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_barberShopId_fkey` FOREIGN KEY (`barberShopId`) REFERENCES `BarberShop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
