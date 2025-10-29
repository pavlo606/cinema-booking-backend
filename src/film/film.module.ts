import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { StorageModule } from '@/storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
