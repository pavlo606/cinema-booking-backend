import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppService } from './app.service';

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Check server" })
  @ApiResponse({ status: 200, description: "Return 'Server works!'" })
  getHello(): string {
    return this.appService.getHello();
  }
}
