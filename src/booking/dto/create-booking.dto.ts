import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateBookingDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    screeningId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    seatId: number;
}
