import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DashboardInfoService {
    constructor(private prisma: PrismaService) {}

    async getCount() {
        const filmsCount = await this.prisma.film.count();
        const screeningsCount = await this.prisma.screening.count();
        const usersCount = await this.prisma.user.count();
        const bookingsCount = await this.prisma.booking.count();

        return {filmsCount, screeningsCount, usersCount, bookingsCount}
    }
}
