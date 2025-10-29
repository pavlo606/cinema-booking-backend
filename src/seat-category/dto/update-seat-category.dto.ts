import { PartialType } from '@nestjs/swagger';
import { CreateSeatCategoryDto } from './create-seat-category.dto';
import { AtLeastOneField } from '@/common/decorators/at-least-one-field.decorator';

export class UpdateSeatCategoryDto extends PartialType(CreateSeatCategoryDto) {
    @AtLeastOneField(["name", "description", "color"])
    _checkAtLeastOneField: string;
}
