import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilmCategoryService } from './film-category.service';
import { CreateFilmCategoryDto } from './dto/create-film-category.dto';
import { UpdateFilmCategoryDto } from './dto/update-film-category.dto';

@Controller('film-category')
export class FilmCategoryController {
  constructor(private readonly filmCategoryService: FilmCategoryService) {}

  @Post()
  create(@Body() createFilmCategoryDto: CreateFilmCategoryDto) {
    return this.filmCategoryService.create(createFilmCategoryDto);
  }

  @Get()
  findAll() {
    return this.filmCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmCategoryDto: UpdateFilmCategoryDto) {
    return this.filmCategoryService.update(+id, updateFilmCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmCategoryService.remove(+id);
  }
}
