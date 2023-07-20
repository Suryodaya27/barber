/*
  Warnings:

  - The primary key for the `booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `booking` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Booking_orderId_key` ON `Booking`(`orderId`);
