import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";
import { CreateHallDto } from "@/hall/dto/create-hall.dto";
import { UpdateHallDto } from "@/hall/dto/update-hall.dto";
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { PromoService } from "./promo.service";
import { CreatePromoDto } from "./dto/create-promo.dto";
import { UpdatePromoDto } from "./dto/update-promo.dto";
import { ApiQuery } from "@nestjs/swagger";

@Controller("promo")
export class PromoController {
    constructor(private readonly promoService: PromoService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async create(@Body() createPromoDto: CreatePromoDto) {
        return this.promoService.create(createPromoDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findAll() {
        return this.promoService.findAll();
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findOne(@Param("id") id: string) {
        return this.promoService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(
        @Param("id") id: string,
        @Body() updatePromoDto: UpdatePromoDto,
    ) {
        return this.promoService.update(+id, updatePromoDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param("id") id: string) {
        return this.promoService.remove(+id);
    }

    @Get("validate/code")
    @ApiQuery({ name: 'code', required: true, description: 'Promocode' })
    async validate(@Query('code') code: string) {
        return this.promoService.validate(code);
    }
}
