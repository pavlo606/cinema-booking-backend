import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { SalesReportDto } from './dto/sales-report.dto';
import { RevenueReportDto } from './dto/revenue-report.dto';
import { OccupancyReportDto } from './dto/occupancy-report.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  // 1. Продані квитки
  @Get('sales')
  @ApiQuery({ name: 'to', required: false, description: 'Report to date' })
  @ApiQuery({ name: 'from', required: false, description: 'Report from date' })
  getSales(@Query() dto: SalesReportDto) {
    return this.reportsService.getSalesReport(dto);
  }

  // 2. Виручка
  @Get('revenue')
  @ApiQuery({ name: 'to', required: false, description: 'Report to date' })
  @ApiQuery({ name: 'from', required: false, description: 'Report from date' })
  getRevenue(@Query() dto: RevenueReportDto) {
    return this.reportsService.getRevenueReport(dto);
  }

  // 3. Заповненість залів
  @Get('occupancy')
  @ApiQuery({ name: 'to', required: false, description: 'Report to date' })
  @ApiQuery({ name: 'from', required: false, description: 'Report from date' })
  getOccupancy(@Query() dto: OccupancyReportDto) {
    return this.reportsService.getOccupancyReport(dto);
  }
}
