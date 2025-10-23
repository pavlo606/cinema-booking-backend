import { PartialType, ApiProperty } from "@nestjs/swagger";
import { CreateBookingDto } from "./create-booking.dto";
import { IsNumber, IsOptional } from "class-validator";
import { AtLeastOneField } from "@/common/decorators/at-least-one-field.decorator";

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
    @AtLeastOneField(["screeningId", "seatId"])
    _checkAtLeastOneField: string;
}
