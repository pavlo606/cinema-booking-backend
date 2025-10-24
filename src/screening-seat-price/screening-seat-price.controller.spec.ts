import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningSeatPriceController } from './screening-seat-price.controller';
import { ScreeningSeatPriceService } from './screening-seat-price.service';

describe('ScreeningSeatPriceController', () => {
  let controller: ScreeningSeatPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreeningSeatPriceController],
      providers: [ScreeningSeatPriceService],
    }).compile();

    controller = module.get<ScreeningSeatPriceController>(ScreeningSeatPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
