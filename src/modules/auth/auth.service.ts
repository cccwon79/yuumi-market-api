import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    // 로그인 로직 구현
    return { message: "로그인 성공" };
  }

  async register(registerDto: RegisterDto) {
    // Implement register logic
    return { message: "회원가입 성공" };
  }
}
