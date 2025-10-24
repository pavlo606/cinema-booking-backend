import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHallDto {
    @ApiProperty({ example: "Cool hall" })
    @IsString()
    name: string;
}
