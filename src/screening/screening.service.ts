import { Injectable } from "@nestjs/common";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningDto } from "./dto/update-screening.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class ScreeningService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateScreeningDto) {
        return this.prisma.screening.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.screening.findMany();
    }

    async findOne(id: number) {
        return this.prisma.screening.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateScreeningDto) {
        return this.prisma.screening.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.screening.delete({ where: { id } });
    }
}
