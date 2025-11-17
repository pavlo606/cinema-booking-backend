/*
  Warnings:

  - A unique constraint covering the columns `[hallId,row,column]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Seat" ALTER COLUMN "categoryId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Seat_hallId_row_column_key" ON "Seat"("hallId", "row", "column");
