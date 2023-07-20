/*
  Warnings:

  - You are about to drop the column `orderAmount` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `booking` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Booking_orderId_key` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `orderAmount`,
    DROP COLUMN `orderId`,
    DROP COLUMN `status`;
