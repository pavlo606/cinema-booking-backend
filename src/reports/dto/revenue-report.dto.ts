import { IsISO8601, IsOptional } from 'class-validator';

export class RevenueReportDto {
  @IsISO8601()
  @IsOptional()
  from: string;

  @IsISO8601()
  @IsOptional()
  to: string;
}
