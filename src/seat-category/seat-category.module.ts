import { Module } from '@nestjs/common';
import { SeatCategoryService } from './seat-category.service';
import { SeatCategoryController } from './seat-category.controller';

@Module({
  controllers: [SeatCategoryController],
  providers: [SeatCategoryService],
})
export class SeatCategoryModule {}
