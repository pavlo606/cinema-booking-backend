import { Test, TestingModule } from '@nestjs/testing';
import { SeatCategoryController } from './seat-category.controller';
import { SeatCategoryService } from './seat-category.service';

describe('SeatCategoryController', () => {
  let controller: SeatCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatCategoryController],
      providers: [SeatCategoryService],
    }).compile();

    controller = module.get<SeatCategoryController>(SeatCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
