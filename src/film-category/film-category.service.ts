import { Injectable } from '@nestjs/common';
import { CreateFilmCategoryDto } from './dto/create-film-category.dto';
import { UpdateFilmCategoryDto } from './dto/update-film-category.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class FilmCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFilmCategoryDto) {
          return this.prisma.filmCategory.create({
              data,
          });
      }
  
      async findAll() {
          return this.prisma.filmCategory.findMany();
      }
  
      async findOne(id: number) {
          return this.prisma.filmCategory.findUnique({
              where: { id },
          });
      }
  
      async update(id: number, data: UpdateFilmCategoryDto) {
          return this.prisma.filmCategory.update({
              where: { id },
              data,
          });
      }
  
      async remove(id: number) {
          return this.prisma.filmCategory.delete({ where: { id } });
      }
}
