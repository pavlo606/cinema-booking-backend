import { Injectable } from "@nestjs/common";
import { CreateScreeningSeatPriceDto } from "./dto/create-screening-seat-price.dto";
import { UpdateScreeningSeatPriceDto } from "./dto/update-screening-seat-price.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class ScreeningSeatPriceService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateScreeningSeatPriceDto) {
        return this.prisma.screeningSeatPrice.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.screeningSeatPrice.findMany();
    }

    async findOne(id: number) {
        return this.prisma.screeningSeatPrice.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdateScreeningSeatPriceDto) {
        return this.prisma.screeningSeatPrice.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.screeningSeatPrice.delete({ where: { id } });
    }
}
