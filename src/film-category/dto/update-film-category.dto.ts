import { PartialType } from "@nestjs/swagger";
import { CreateFilmCategoryDto } from "./create-film-category.dto";
import { AtLeastOneField } from "@/common/decorators/at-least-one-field.decorator";

export class UpdateFilmCategoryDto extends PartialType(CreateFilmCategoryDto) {
    @AtLeastOneField(["name"])
    _checkAtLeastOneField: string;
}
