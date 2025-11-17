import { Test, TestingModule } from '@nestjs/testing';
import { DashboardInfoService } from './dashboard-info.service';

describe('DashboardInfoService', () => {
  let service: DashboardInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardInfoService],
    }).compile();

    service = module.get<DashboardInfoService>(DashboardInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
