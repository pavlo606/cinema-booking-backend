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
import { SeatCategoryService } from "./seat-category.service";
import { CreateSeatCategoryDto } from "./dto/create-seat-category.dto";
import { UpdateSeatCategoryDto } from "./dto/update-seat-category.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";

@Controller("seat-category")
export class SeatCategoryController {
    constructor(private readonly seatCategoryService: SeatCategoryService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async create(@Body() createSeatCategoryDto: CreateSeatCategoryDto) {
        return this.seatCategoryService.create(createSeatCategoryDto);
    }

    @Get()
    async findAll() {
        return this.seatCategoryService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.seatCategoryService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(
        @Param("id") id: string,
        @Body() updateSeatCategoryDto: UpdateSeatCategoryDto,
    ) {
        return this.seatCategoryService.update(+id, updateSeatCategoryDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param("id") id: string) {
        return this.seatCategoryService.remove(+id);
    }
}
