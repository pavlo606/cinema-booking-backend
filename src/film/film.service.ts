import { Injectable } from "@nestjs/common";
import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class FilmService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateFilmDto) {
        return this.prisma.film.create({
            data
        });
    }

    async findAll() {
        return this.prisma.film.findMany();
    }

    async findOne(id: number) {
        return this.prisma.film.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateFilmDto) {
        return this.prisma.film.update({
            where: { id },
            data
        });
    }

    async remove(id: number) {
        return this.prisma.film.delete({ where: { id } });
    }
}
