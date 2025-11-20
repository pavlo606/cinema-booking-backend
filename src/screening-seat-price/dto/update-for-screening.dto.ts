import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNumber } from "class-validator"

export class UpdateForScreenignDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  screeningId: number

  @ApiProperty({ example: [{ categoryId: 4, price: 100 }] })
  @IsArray()
  priceSettings: {
    categoryId: number
    price: number
  }[]
}