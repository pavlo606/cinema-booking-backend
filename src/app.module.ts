import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, BookingModule, FilmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
