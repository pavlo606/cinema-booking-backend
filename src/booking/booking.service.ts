import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, data: CreateBookingDto) {
        return this.prisma.booking.create({
            data: { ...data, userId },
        });
    }

    async findAll() {
        return this.prisma.booking.findMany({
            include: { screening: { include: { film: true, hall: true } }, seat: true },
        });
    }

    async findOne(id: number) {
        return this.prisma.booking.findUnique({
            where: { id },
            include: { screening: { include: { film: true, hall: true } }, seat: true },
        });
    }

    async findAllForUser(userId: number) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: { screening: { include: { film: true, hall: true } }, seat: true },
        });
    }

    async update(id: number, userId: number, data: UpdateBookingDto) {
        return this.prisma.booking.update({
            where: { id },
            data: { ...data, userId },
        });
    }

    async remove(id: number) {
        return this.prisma.booking.delete({ where: { id } });
    }
}
