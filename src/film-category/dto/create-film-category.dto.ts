import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFilmCategoryDto {
    @ApiProperty({ example: "Drama" })
    @IsString()
    name: string;
}
