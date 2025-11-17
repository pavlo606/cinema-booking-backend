import { Injectable } from "@nestjs/common";
import { CreateHallDto } from "./dto/create-hall.dto";
import { UpdateHallDto } from "./dto/update-hall.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class HallService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateHallDto) {
        return this.prisma.hall.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.hall.findMany({
            include: { seats: { include: { category: true } } },
        });
    }

    async findOne(id: number) {
        return this.prisma.hall.findUnique({
            where: { id },
            include: { seats: { include: { category: true } } },
        });
    }

    async update(id: number, data: UpdateHallDto) {
        return this.prisma.hall.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.hall.delete({ where: { id } });
    }
}
