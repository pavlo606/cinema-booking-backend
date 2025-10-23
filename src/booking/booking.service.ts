import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}

    create(userId: number, data: CreateBookingDto) {
        return this.prisma.booking.create({
            data: {...data, userId},
        });
    }

    findAll() {
        return this.prisma.booking.findMany();
    }

    findOne(id: number) {
        return this.prisma.booking.findUnique({
            where: { id },
        });
    }

    update(id: number, userId: number, data: UpdateBookingDto) {
        return this.prisma.booking.update({
            where: { id },
            data: {...data, userId},
        });
    }

    remove(id: number) {
        return this.prisma.booking.delete({ where: { id } });
    }
}
