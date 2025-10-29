import { Module } from '@nestjs/common';
import { FilmCategoryService } from './film-category.service';
import { FilmCategoryController } from './film-category.controller';

@Module({
  controllers: [FilmCategoryController],
  providers: [FilmCategoryService],
})
export class FilmCategoryModule {}
