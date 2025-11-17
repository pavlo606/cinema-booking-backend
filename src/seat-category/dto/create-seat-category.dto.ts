import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateSeatCategoryDto {
    @ApiProperty({ example: "Standart" })
    @IsString()
    name: string;

    @ApiProperty({ example: "Standart seat" })
    @IsOptional()
    @IsString()
    description: string;
    
    @ApiProperty({ example: "#888" })
    @IsString()
    color: string;
}

