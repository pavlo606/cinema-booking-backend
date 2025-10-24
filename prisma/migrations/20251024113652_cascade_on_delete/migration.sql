-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_screeningId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_seatId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Screening" DROP CONSTRAINT "Screening_filmId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Screening" DROP CONSTRAINT "Screening_hallId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScreeningSeatPrice" DROP CONSTRAINT "ScreeningSeatPrice_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ScreeningSeatPrice" DROP CONSTRAINT "ScreeningSeatPrice_screeningId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Seat" DROP CONSTRAINT "Seat_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Seat" DROP CONSTRAINT "Seat_hallId_fkey";

-- AddForeignKey
ALTER TABLE "ScreeningSeatPrice" ADD CONSTRAINT "ScreeningSeatPrice_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScreeningSeatPrice" ADD CONSTRAINT "ScreeningSeatPrice_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SeatCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SeatCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Hall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_hallId_fkey" FOREIGN KEY ("hallId") REFERENCES "Hall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_screeningId_fkey" FOREIGN KEY ("screeningId") REFERENCES "Screening"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
