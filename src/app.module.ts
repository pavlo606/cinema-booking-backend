import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { FilmModule } from './film/film.module';
import { HallModule } from './hall/hall.module';
import { SeatCategoryModule } from './seat-category/seat-category.module';
import { SeatModule } from './seat/seat.module';
import { ScreeningModule } from './screening/screening.module';
import { ScreeningSeatPriceModule } from './screening-seat-price/screening-seat-price.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, BookingModule, FilmModule, HallModule, SeatCategoryModule, SeatModule, ScreeningModule, ScreeningSeatPriceModule, StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
