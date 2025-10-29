import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateSeatCategoryDto {
    @ApiProperty({ example: "Standart" })
    @IsString()
    name: string;

    @ApiProperty({ example: "Standart seat" })
    @IsString()
    description: string;
    
    @ApiProperty({ example: "#888" })
    @IsString()
    color: string;
}

