import { PartialType } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';
import { AtLeastOneField } from '@/common/decorators/at-least-one-field.decorator';

export class UpdateSeatDto extends PartialType(CreateSeatDto) {
    @AtLeastOneField(["hallId", "categoryId", "row", "column"])
    _checkAtLeastOneField: string;
}
