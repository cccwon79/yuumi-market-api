import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getProfile(userId: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) throw new NotFoundException("사용자를 찾을 수 없습니다.");
    return data;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("profiles")
      .update(updateProfileDto)
      .eq("id", userId);
    if (error)
      throw new InternalServerErrorException("프로필 업데이트에 실패했습니다.");
    return data;
  }

  async socialLogin(provider: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithOAuth({
        provider: provider as any,
      });
    if (error)
      throw new InternalServerErrorException("소셜 로그인에 실패했습니다.");
    return data;
  }

  async getAllUsers() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from("profiles")
      .select("*");
    if (error)
      throw new InternalServerErrorException("사용자 조회에 실패했습니다.");
    return { users: data };
  }
}
