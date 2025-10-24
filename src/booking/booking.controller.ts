import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { type Request } from "express";

@Controller('booking')
@UseGuards(JwtAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Req() req: Request, @Body() createBookingDto: CreateBookingDto) {
    const user = req.user as { userId: number };
    return this.bookingService.create(user.userId, createBookingDto);
  }

  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @Patch(':id')
  async update(@Req() req: Request, @Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    const user = req.user as { userId: number };
    return this.bookingService.update(+id, user.userId, updateBookingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
