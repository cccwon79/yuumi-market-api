import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Put,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("profile")
  @ApiOperation({ summary: "사용자 프로필 조회" })
  @ApiResponse({ status: 200, description: "사용자 프로필 정보 반환" })
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }

  @Put("profile")
  @ApiOperation({ summary: "사용자 프로필 수정" })
  @ApiResponse({ status: 200, description: "사용자 프로필 수정 성공" })
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Post("login/:provider")
  @ApiOperation({ summary: "소셜 로그인" })
  @ApiResponse({ status: 200, description: "소셜 로그인 성공" })
  async socialLogin(@Param("provider") provider: string) {
    return this.usersService.socialLogin(provider);
  }

  @Get()
  @ApiOperation({ summary: "모든 사용자 조회" })
  @ApiResponse({ status: 200, description: "사용자 목록 반환" })
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
