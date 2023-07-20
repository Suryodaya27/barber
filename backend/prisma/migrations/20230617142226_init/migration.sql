/*
  Warnings:

  - Added the required column `orderAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `orderAmount` DOUBLE NOT NULL,
    ADD COLUMN `orderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `price` DOUBLE NOT NULL;
