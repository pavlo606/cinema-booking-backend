import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional } from "class-validator";

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

    @ApiProperty({ example: "genre" })
    @IsOptional()
    @IsString()
    genre?: string;

    @IsOptional()
    @IsString()
    posterURL?: string;
}
