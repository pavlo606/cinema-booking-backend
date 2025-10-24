import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningSeatPriceService } from './screening-seat-price.service';

describe('ScreeningSeatPriceService', () => {
  let service: ScreeningSeatPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScreeningSeatPriceService],
    }).compile();

    service = module.get<ScreeningSeatPriceService>(ScreeningSeatPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
