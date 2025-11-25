import { Injectable } from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { SocketGateway } from "@/socket/socket.gateway";

@Injectable()
export class BookingService {
    constructor(
        private prisma: PrismaService,
        private socketGateway: SocketGateway,
    ) {}

    async create(userId: number, data: CreateBookingDto) {
        const seat = await this.prisma.seat.findUnique({
            where: { id: data.seatId },
        });
        if (!seat?.categoryId) return;

        const priceEntry = await this.prisma.screeningSeatPrice.findFirst({
            where: {
                screeningId: data.screeningId,
                categoryId: seat.categoryId,
            },
        });

        const promo = await this.prisma.promoCode.findUnique({
            where: { code: data.promocode || "" },
        });
        const discount = promo?.discount || 0;

        const basePrice = Number(priceEntry?.price) || 0;

        const res = await this.prisma.booking.create({
            data: {
                ...data,
                userId,
                price: basePrice - (basePrice * discount) / 100,
                basePrice,
                discount,
            },
        });

        const bookings = await this.prisma.booking.findMany({
            where: { screeningId: data.screeningId },
        });

        this.socketGateway.broadcastSeatsUpdate(data.screeningId, bookings);

        return res;
    }

    async findAll() {
        return this.prisma.booking.findMany({
            include: {
                screening: { include: { film: true, hall: true } },
                seat: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.booking.findUnique({
            where: { id },
            include: {
                screening: { include: { film: true, hall: true } },
                seat: true,
            },
        });
    }

    async findAllForUser(userId: number) {
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                screening: { include: { film: true, hall: true } },
                seat: true,
            },
        });
    }

    async update(id: number, userId: number, data: UpdateBookingDto) {
        return this.prisma.booking.update({
            where: { id },
            data: { ...data, userId },
        });
    }

    async remove(id: number) {
        const res = await this.prisma.booking.delete({ where: { id } });

        const bookings = await this.prisma.booking.findMany({
            where: { screeningId: res.screeningId },
        });
        console.log(bookings);

        this.socketGateway.broadcastSeatsUpdate(res.screeningId, bookings);

        return res;
    }
}
