import { PartialType } from "@nestjs/swagger";
import { CreatePromoDto } from "./create-promo.dto";
import { AtLeastOneField } from "@/common/decorators/at-least-one-field.decorator";

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
    @AtLeastOneField(["code", "discount", "expiresAt"])
    _checkAtLeastOneField: string;
}
