import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePromoDto {
    @ApiProperty({ example: "CINEMA123" })
    @IsString()
    code: string;

    @ApiProperty({ example: 10 })
    @IsNumber()
    discount: number;
    
    @ApiProperty({ example: "2025-12-24 9:00:00Z" })
    @Type(() => Date)
    @IsDate()
    expiresAt: string;
}
