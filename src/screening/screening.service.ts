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
                hall: {
                    include: { seats: { include: { category: true } } },
                },
                seatPrices: { include: { category: true } },
                bookings: true,
                film: true,
            },
            orderBy: {
                id: "desc",
            },
        });
    }

    async findPrices(id: number) {
        return this.prisma.screening.findUnique({
            where: { id },
            include: {
                seatPrices: true,
                film: true
            },
        });
    }

    async findByDate(date?: string) {
        if (!date) {
            const today = new Date();
            date = today.toISOString().split("T")[0];
        }

        const startOfDay = new Date(date + "T00:00:00.000Z");
        const endOfDay = new Date(date + "T23:59:59.999Z");

        return this.prisma.film.findMany({
            where: {
                screenings: {
                    some: {
                        startTime: {
                            gte: startOfDay,
                            lte: endOfDay,
                        },
                    },
                },
            },
            include: {
                screenings: {
                    where: {
                        startTime: {
                            gte: startOfDay,
                            lte: endOfDay,
                        },
                    },
                    orderBy: { startTime: "asc" },
                },
            },
            orderBy: { name: "asc" },
        });
    }

    async findOne(id: number) {
        return this.prisma.screening.findUnique({
            where: { id },
            include: {
                hall: { include: { seats: { include: { category: true } } } },
                seatPrices: { include: { category: true } },
                bookings: true,
                film: true,
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
