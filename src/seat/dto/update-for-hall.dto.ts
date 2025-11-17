import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray } from "class-validator";

export class UpdateForHallDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    hallId: number;

    @ApiProperty({ example: [{ categoryId: 4, row: 1, column: 1 }] })
    @IsArray()
    seats: {
        categoryId: number;
        row: number;
        column: number;
    }[];
}
