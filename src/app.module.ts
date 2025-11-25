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
import { FilmCategoryModule } from './film-category/film-category.module';
import { DashboardInfoModule } from './dashboard-info/dashboard-info.module';
import { SocketGateway } from './socket/socket.gateway';
import { ReportsModule } from './reports/reports.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, BookingModule, FilmModule, HallModule, SeatCategoryModule, SeatModule, ScreeningModule, ScreeningSeatPriceModule, StorageModule, FilmCategoryModule, DashboardInfoModule, ReportsModule, PromoModule],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
