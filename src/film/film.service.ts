import { Injectable } from "@nestjs/common";
import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { StorageService } from "@/storage/storage.service";

@Injectable()
export class FilmService {
    constructor(
        private prisma: PrismaService,
        private readonly storageService: StorageService,
    ) {}

    async create(data: CreateFilmDto) {
        return this.prisma.film.create({
            data,
        });
    }

    async findAll() {
        const films = await this.prisma.film.findMany();
        return films.map((film) => ({
            ...film,
            posterURL: this.genereteUrl(film.posterURL),
        }));
    }

    async findOne(id: number) {
        const film = await this.prisma.film.findUnique({
            where: { id },
        });
        if (film)
            return { ...film, posterURL: this.genereteUrl(film?.posterURL) };
        return film;
    }

    async update(id: number, data: UpdateFilmDto) {
        const film = await this.prisma.film.findUnique({
            where: { id },
        });
        if (film && film.posterURL && data.posterURL)
            await this.storageService.delete(film.posterURL)

        return this.prisma.film.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        const film = await this.prisma.film.findUnique({
            where: { id },
        });
        if (film && film.posterURL)
            await this.storageService.delete(film.posterURL)

        return this.prisma.film.delete({ where: { id } });
    }

    private genereteUrl = (posterURL: string | null): string | null => {
        if (posterURL?.startsWith("firebase:")) {
            return `${posterURL?.replace(/firebase:/, "https://storage.googleapis.com/")}`;
        }
        if (posterURL?.startsWith("local:")) {
            return `${posterURL?.replace(/local:/, `${process.env.BASE_URL}/`)}`;
        }
        return posterURL;
    };
}
