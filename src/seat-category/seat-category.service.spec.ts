import { Test, TestingModule } from '@nestjs/testing';
import { SeatCategoryService } from './seat-category.service';

describe('SeatCategoryService', () => {
  let service: SeatCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatCategoryService],
    }).compile();

    service = module.get<SeatCategoryService>(SeatCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
