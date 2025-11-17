import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { DashboardInfoService } from "./dashboard-info.service";

@Controller("dashboard-info")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class DashboardInfoController {
    constructor(private readonly dashboardInfoService: DashboardInfoService) {}
    @Get("count")
    getCount() {
        return this.dashboardInfoService.getCount();
    }
}
