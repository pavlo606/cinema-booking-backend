import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { ScreeningSeatPriceService } from "./screening-seat-price.service";
import { CreateScreeningSeatPriceDto } from "./dto/create-screening-seat-price.dto";
import { UpdateScreeningSeatPriceDto } from "./dto/update-screening-seat-price.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";
import { UpdateForScreenignDto } from "./dto/update-for-screening.dto";

@Controller("screening-seat-price")
export class ScreeningSeatPriceController {
    constructor(
        private readonly screeningSeatPriceService: ScreeningSeatPriceService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async create(
        @Body() createScreeningSeatPriceDto: CreateScreeningSeatPriceDto,
    ) {
        return this.screeningSeatPriceService.create(
            createScreeningSeatPriceDto,
        );
    }

    @Get()
    async findAll() {
        return this.screeningSeatPriceService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.screeningSeatPriceService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(
        @Param("id") id: string,
        @Body() updateScreeningSeatPriceDto: UpdateScreeningSeatPriceDto,
    ) {
        return this.screeningSeatPriceService.update(
            +id,
            updateScreeningSeatPriceDto,
        );
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param("id") id: string) {
        return this.screeningSeatPriceService.remove(+id);
    }

    @Post("update-screening")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async updateForScreening(@Body() dto: UpdateForScreenignDto) {
        return this.screeningSeatPriceService.updateForScreening(dto);
    }
}
