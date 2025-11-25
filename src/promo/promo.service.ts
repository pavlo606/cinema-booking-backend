import { PrismaService } from "@/prisma/prisma.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePromoDto } from "./dto/create-promo.dto";
import { UpdatePromoDto } from "./dto/update-promo.dto";

@Injectable()
export class PromoService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreatePromoDto) {
        return this.prisma.promoCode.create({
            data,
        });
    }

    async findAll() {
        return this.prisma.promoCode.findMany();
    }

    async findOne(id: number) {
        return this.prisma.promoCode.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: UpdatePromoDto) {
        return this.prisma.promoCode.update({
            where: { id },
            data,
        });
    }

    async remove(id: number) {
        return this.prisma.promoCode.delete({ where: { id } });
    }

    async validate(code: string) {
        const promo = await this.prisma.promoCode.findUnique({
            where: { code },
        });

        if (!promo || !promo.isActive) {
            throw new BadRequestException("Invalid promo code");
        }

        if (promo.expiresAt && promo.expiresAt < new Date()) {
            throw new BadRequestException("Promo code expired");
        }

        return promo;
    }
}
