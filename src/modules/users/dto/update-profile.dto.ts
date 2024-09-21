import { IsOptional, IsString, IsEmail } from "class-validator";

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  // 필요한 다른 필드들을 여기에 추가하세요
}
