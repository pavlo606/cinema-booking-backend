/*
  Warnings:

  - You are about to drop the column `genre` on the `Film` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Film" DROP COLUMN "genre";

-- CreateTable
CREATE TABLE "FilmCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FilmCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilmCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FilmCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmCategory_name_key" ON "FilmCategory"("name");

-- CreateIndex
CREATE INDEX "_FilmCategories_B_index" ON "_FilmCategories"("B");

-- AddForeignKey
ALTER TABLE "_FilmCategories" ADD CONSTRAINT "_FilmCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmCategories" ADD CONSTRAINT "_FilmCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "FilmCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
