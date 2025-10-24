import { PartialType } from '@nestjs/swagger';
import { CreateScreeningSeatPriceDto } from './create-screening-seat-price.dto';
import { AtLeastOneField } from '@/common/decorators/at-least-one-field.decorator';

export class UpdateScreeningSeatPriceDto extends PartialType(CreateScreeningSeatPriceDto) {
    @AtLeastOneField(["screeningId", "categoryId", "price"])
    _checkAtLeastOneField: string;
}
