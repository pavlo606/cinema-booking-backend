import { PartialType } from "@nestjs/swagger";
import { CreateHallDto } from "./create-hall.dto";
import { AtLeastOneField } from "@/common/decorators/at-least-one-field.decorator";

export class UpdateHallDto extends PartialType(CreateHallDto) {
    @AtLeastOneField(["name"])
    _checkAtLeastOneField: string;
}
