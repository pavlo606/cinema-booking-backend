import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    screeningId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    seatId: number;

    @ApiProperty({ example: "PROMO1" })
    @IsString()
    @IsOptional()
    promocode?: string;

    // @ApiProperty({ example: 0 })
    // @IsNumber()
    // @IsOptional()
    // discount?: number;
}
