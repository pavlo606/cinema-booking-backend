import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HallService } from './hall.service';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/auth/roles.decorator';
import { Role } from '@/auth/roles.enum';

@Controller('hall')
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createHallDto: CreateHallDto) {
    return this.hallService.create(createHallDto);
  }

  @Get()
  async findAll() {
    return this.hallService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hallService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateHallDto: UpdateHallDto) {
    return this.hallService.update(+id, updateHallDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return this.hallService.remove(+id);
  }
}
