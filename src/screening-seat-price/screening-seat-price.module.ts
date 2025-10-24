import { Module } from '@nestjs/common';
import { ScreeningSeatPriceService } from './screening-seat-price.service';
import { ScreeningSeatPriceController } from './screening-seat-price.controller';

@Module({
  controllers: [ScreeningSeatPriceController],
  providers: [ScreeningSeatPriceService],
})
export class ScreeningSeatPriceModule {}
