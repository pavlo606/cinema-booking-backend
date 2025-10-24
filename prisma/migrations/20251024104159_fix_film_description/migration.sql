/*
  Warnings:

  - You are about to drop the column `descripiton` on the `Film` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "descripiton",
ADD COLUMN     "description" TEXT;
