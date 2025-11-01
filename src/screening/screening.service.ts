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
        return this.prisma.screening.findMany({
            include: {
                hall: { include: { seats: { include: { category: true } } } },
                seatPrices: { include: { category: true } },
                bookings: true
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.screening.findUnique({
            where: { id },
            include: {
                hall: { include: { seats: { include: { category: true } } } },
                seatPrices: { include: { category: true } },
                bookings: true
            },
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
