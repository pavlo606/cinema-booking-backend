import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateScreeningDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    filmId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    hallId: number;

    @ApiProperty({ example: "2025-10-24 9:00:00Z" })
    @Type(() => Date)
    @IsDate()
    startTime: Date;

    @ApiProperty({ example: "2025-10-24 10:00:00Z" })
    @Type(() => Date)
    @IsDate()
    endTime: Date;
}

