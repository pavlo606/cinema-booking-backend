import { PartialType } from '@nestjs/swagger';
import { CreateScreeningDto } from './create-screening.dto';
import { AtLeastOneField } from '@/common/decorators/at-least-one-field.decorator';

export class UpdateScreeningDto extends PartialType(CreateScreeningDto) {
    @AtLeastOneField(["filmId", "hallId", "startTime", "endTime"])
    _checkAtLeastOneField: string;
}
