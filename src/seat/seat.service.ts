import { Injectable } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { UpdateForHallDto } from "./dto/update-for-hall.dto";

@Injectable()
export class SeatService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateSeatDto) {
        return this.prisma.seat.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.seat.findMany();
    }

    async findOne(id: number) {
        return this.prisma.seat.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateSeatDto) {
        return this.prisma.seat.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.seat.delete({ where: { id } });
    }

    async updateForHall(data: UpdateForHallDto) {
        await this.prisma.seat.deleteMany({ where: { hallId: data.hallId } });
        return await this.prisma.seat.createMany({
            data: data.seats.map((s) => ({ ...s, hallId: data.hallId })),
        });
    }
}
