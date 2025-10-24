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
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";

@Controller("seat")
export class SeatController {
    constructor(private readonly seatService: SeatService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async create(@Body() createSeatDto: CreateSeatDto) {
        return this.seatService.create(createSeatDto);
    }

    @Get()
    async findAll() {
        return this.seatService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.seatService.findOne(+id);
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async update(@Param("id") id: string, @Body() updateSeatDto: UpdateSeatDto) {
        return this.seatService.update(+id, updateSeatDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async remove(@Param("id") id: string) {
        return this.seatService.remove(+id);
    }
}
