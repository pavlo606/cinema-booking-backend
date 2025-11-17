import { Test, TestingModule } from '@nestjs/testing';
import { DashboardInfoController } from './dashboard-info.controller';

describe('DashboardInfoController', () => {
  let controller: DashboardInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardInfoController],
    }).compile();

    controller = module.get<DashboardInfoController>(DashboardInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
