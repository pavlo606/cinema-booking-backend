import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsEmail, IsEnum } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: "example@example.com" })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "example_user" })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({ example: "Pa$$word" })
    @IsOptional()
    @IsString()
    password_hash?: string;

    @ApiProperty({ example: "User" })
    @IsOptional()
    @IsEnum({
        ADMIN: "Admin",
        USER: "User",
    })
    role?: "Admin" | "User";
}
