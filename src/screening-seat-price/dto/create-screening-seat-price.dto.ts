import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsDecimal, IsString } from "class-validator";
import { Prisma } from '@prisma/client'
import { Type } from "class-transformer";

export class CreateScreeningSeatPriceDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    screeningId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    categoryId: number;

    @ApiProperty({ example: '"100.5"' })
    @IsDecimal()
    @Type(() => Prisma.Decimal)
    price: Prisma.Decimal;
}

