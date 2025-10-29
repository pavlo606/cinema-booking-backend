import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsArray } from "class-validator";

export class CreateFilmDto {
    @ApiProperty({ example: "Cool film" })
    @IsString()
    name: string;

    @ApiProperty({ example: 120 })
    @IsNumber()
    duration: number;

    @ApiProperty({ example: "Description for cool film" })
    @IsString()
    description: string;

    @ApiProperty({ example: [1, 2] })
    @IsOptional()
    @IsArray()
    categories?: number[];

    @IsOptional()
    @IsString()
    posterURL?: string;
}
