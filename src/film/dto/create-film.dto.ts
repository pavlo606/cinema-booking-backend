import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFilmDto {
    @ApiProperty({ example: "Cool film" })
    @IsString()
    name: string;

    @ApiProperty({ example: 120 })
    @IsNumber()
    duration: number;

    @ApiProperty({ example: "Description for cool film" })
    @IsString()
    descripiton: string;
}

