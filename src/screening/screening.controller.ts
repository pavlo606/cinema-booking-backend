import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from "@nestjs/common";
import { ScreeningService } from "./screening.service";
import { CreateScreeningDto } from "./dto/create-screening.dto";
import { UpdateScreeningDto } from "./dto/update-screening.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";

@Controller("screening")
export class ScreeningController {
    constructor(private readonly screeningService: ScreeningService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async create(@Body() createScreeningDto: CreateScreeningDto) {
        return this.screeningService.create(createScreeningDto);
    }

    @Get()
    async findAll() {
        return this.screeningService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.screeningService.findOne(+id);
    }

    @Get(":id/prices")
    async findPrices(@Param("id") id: string) {
        return this.screeningService.findPrices(+id);
    }

    @Get("/by/date")
    async findByDate(@Query('date') date?: string) {
        return this.screeningService.findByDate(date);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(
        @Param("id") id: string,
        @Body() updateScreeningDto: UpdateScreeningDto,
    ) {
        return this.screeningService.update(+id, updateScreeningDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param("id") id: string) {
        return this.screeningService.remove(+id);
    }
}
