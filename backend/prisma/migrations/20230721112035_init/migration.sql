-- CreateTable
CREATE TABLE `BarbershopView` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `barbershopId` INTEGER NOT NULL,
    `barbershopImage` VARCHAR(191) NOT NULL,
    `menuImage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BarbershopView` ADD CONSTRAINT `BarbershopView_barbershopId_fkey` FOREIGN KEY (`barbershopId`) REFERENCES `BarberShop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
