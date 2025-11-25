/*
  Warnings:

  - Added the required column `basePrice` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "basePrice" DECIMAL(10,2) NOT NULL;
