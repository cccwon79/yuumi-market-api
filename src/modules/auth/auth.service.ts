import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { Provider } from "@supabase/supabase-js";
import { AuthResponse, LoginDto, SignupDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signup(signupDto: SignupDto): Promise<AuthResponse> {
    const { data, error } = await this.supabaseService.getClient().auth.signUp({
      email: signupDto.email,
      password: signupDto.password,
    });

    if (error)
      throw new UnauthorizedException("회원가입 실패: " + error.message);

    // 프로필 생성 로직 추가
    await this.supabaseService.getClient().from("profiles").insert({
      id: data.user.id,
      email: data.user.email,
      nickname: signupDto.nickname,
    });

    return this.generateAuthResponse(data);
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithPassword({
        email: loginDto.email,
        password: loginDto.password,
      });

    if (error) throw new UnauthorizedException("로그인 실패: " + error.message);

    return this.generateAuthResponse(data);
  }

  private generateAuthResponse(data: any): AuthResponse {
    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        image: data.user.user_metadata.avatar_url || null,
        nickname: data.user.user_metadata.full_name || "",
        updatedAt: data.user.updated_at,
        createdAt: data.user.created_at,
      },
    };
  }

  async socialLogin(provider: string, token: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          queryParams: { access_token: token },
        },
      });

    if (error) throw error;
    return data;
  }
}
