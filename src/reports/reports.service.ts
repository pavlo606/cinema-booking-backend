import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SalesReportDto } from "./dto/sales-report.dto";
import { RevenueReportDto } from "./dto/revenue-report.dto";
import { OccupancyReportDto } from "./dto/occupancy-report.dto";

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) {}

    async getSalesReport(dto: SalesReportDto) {
        const { from, to } = dto;

        const where: any = {};

        if (from || to) {
            where.createdAt = {};

            if (from) where.createdAt.gte = new Date(from);
            if (to) {
                const end = new Date(to);
                end.setHours(23, 59, 59, 999);
                where.createdAt.lte = end;
            }
        }

        const screenings = await this.prisma.screening.findMany({
            where,
            include: {
                film: true,
                bookings: true,
            },
        });

        const soldTickets = screenings.map((screening) => ({
            soldTickets: screening.bookings.length,
            ...screening,
        }));

        return {
            totalSold: soldTickets
                .map((a) => a.soldTickets)
                .reduce((a, b) => a + b, 0),
            soldTickets,
        };
    }

    async getRevenueReport(dto: RevenueReportDto) {
        const { from, to } = dto;

        const screeningsRevenue = (await this.prisma.$queryRawUnsafe(
            `
      SELECT
        s.id AS "screeningId",
        f.name AS "filmTitle",
        s."startTime",
        COALESCE(SUM(b.price), 0) AS "revenue",
        COUNT(b.id) AS "soldTickets"
      FROM "Screening" s
      JOIN "Film" f ON f.id = s."filmId"
      LEFT JOIN "Booking" b 
          ON b."screeningId" = s.id
          AND b."createdAt" BETWEEN $1 AND $2
      GROUP BY s.id, f.name;
    `,
            from ? new Date(from) : new Date(0),
            to ? new Date(to) : new Date("9999-01-01"),
        )) as any;

        return {
            totalRevenue: screeningsRevenue
                .map((a) => Number(a.revenue))
                .reduce((a, b) => a + b, 0),
            screeningsRevenue,
        };
    }

    async getOccupancyReport(dto: OccupancyReportDto) {
        const { from, to } = dto;

        const where: any = {};

        if (from || to) {
            where.createdAt = {};

            if (from) where.createdAt.gte = new Date(from);
            if (to) {
                const end = new Date(to);
                end.setHours(23, 59, 59, 999);
                where.createdAt.lte = end;
            }
        }

        const halls = await this.prisma.hall.findMany();

        const occupancy = await Promise.all(
            halls.map(async ({ id: hallId, name }) => {
                const screenings = await this.prisma.screening.findMany({
                    where: {
                        hallId,
                        ...where
                    },
                    include: {
                        bookings: {
                            where: { status: "Booked" },
                        },
                    },
                });

                const totalSeats = await this.prisma.seat.count({
                    where: { hallId },
                });

                return {
                    name,
                    hallId,
                    totalSeats,
                    screenings: screenings.map((scr) => ({
                        screeningId: scr.id,
                        filmId: scr.filmId,
                        startTime: scr.startTime,
                        bookedSeats: scr.bookings.length,
                        occupancyPercent:
                            totalSeats > 0
                                ? Math.round(
                                      (scr.bookings.length / totalSeats) * 100,
                                  )
                                : 0,
                    })),
                };
            }),
        );

        console.log(occupancy);

        return occupancy.map((hall) => {
            let average = 0;
            hall.screenings.forEach((element) => {
                average += element.occupancyPercent / hall.screenings.length;
            });

            return {
                name: hall.name,
                hallId: hall.hallId,
                totalSeats: hall.totalSeats,
                average,
            };
        });
    }
}
