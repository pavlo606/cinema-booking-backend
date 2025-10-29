import { PartialType } from '@nestjs/swagger';
import { CreateFilmDto } from './create-film.dto';
import { AtLeastOneField } from '@/common/decorators/at-least-one-field.decorator';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
    @AtLeastOneField(["name", "duration", "descripiton", "genre", "posterURL"])
    _checkAtLeastOneField: string;
}
