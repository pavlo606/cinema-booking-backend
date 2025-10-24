import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSeatDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    hallId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    categoryId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    row: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    column: number;
}

