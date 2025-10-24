import { Injectable } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { PrismaService } from "@/prisma/prisma.service";

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
}
