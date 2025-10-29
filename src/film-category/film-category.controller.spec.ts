import { Test, TestingModule } from '@nestjs/testing';
import { FilmCategoryController } from './film-category.controller';
import { FilmCategoryService } from './film-category.service';

describe('FilmCategoryController', () => {
  let controller: FilmCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmCategoryController],
      providers: [FilmCategoryService],
    }).compile();

    controller = module.get<FilmCategoryController>(FilmCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
