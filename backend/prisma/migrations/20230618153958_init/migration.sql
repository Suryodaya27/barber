/*
  Warnings:

  - The primary key for the `booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
