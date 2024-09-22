import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { Public } from "./common/decorators/public.decorator";

@ApiTags("app")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "홈페이지" })
  @ApiResponse({ status: 200, description: "홈페이지", type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}
