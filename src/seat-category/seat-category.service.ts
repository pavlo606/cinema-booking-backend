import { Injectable } from "@nestjs/common";
import { CreateSeatCategoryDto } from "./dto/create-seat-category.dto";
import { UpdateSeatCategoryDto } from "./dto/update-seat-category.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class SeatCategoryService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateSeatCategoryDto) {
        return this.prisma.seatCategory.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.seatCategory.findMany();
    }

    async findOne(id: number) {
        return this.prisma.seatCategory.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateSeatCategoryDto) {
        return this.prisma.seatCategory.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.seatCategory.delete({ where: { id } });
    }
}
