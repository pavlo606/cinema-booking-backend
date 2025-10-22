import { Controller, Get, UseGuards, Req, Patch, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { type Request } from "express";

import { UserService } from "./user.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("User")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get("me")
    @ApiOperation({ summary: "Get loggined user" })
    @ApiResponse({ status: 200, description: "Returns user data" })
    @ApiResponse({ status: 401, description: "Invalid credentionals" })
    async getMe(@Req() req: Request) {
        const user = req.user as { userId: number };
        return this.userService.findByIdSafe(user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @ApiOperation({ summary: "Change user data" })
    @ApiResponse({ status: 200, description: "User data changed" })
    @ApiResponse({ status: 401, description: "Invalid credentionals" })
    async updateUser(@Req() req: Request, @Body() dto: UpdateUserDto) {
        const user = req.user as { userId: number };
        return this.userService.update(user.userId, dto);
    }
}
