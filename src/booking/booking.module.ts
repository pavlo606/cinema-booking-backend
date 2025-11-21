import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SocketGateway } from '@/socket/socket.gateway';

@Module({
  controllers: [BookingController],
  providers: [BookingService, SocketGateway],
})
export class BookingModule {}
