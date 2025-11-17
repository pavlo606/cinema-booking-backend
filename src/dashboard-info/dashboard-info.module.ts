import { Module } from '@nestjs/common';
import { DashboardInfoService } from './dashboard-info.service';
import { DashboardInfoController } from './dashboard-info.controller';

@Module({
  providers: [DashboardInfoService],
  controllers: [DashboardInfoController]
})
export class DashboardInfoModule {}
