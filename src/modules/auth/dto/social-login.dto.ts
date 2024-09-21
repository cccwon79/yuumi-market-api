import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SocialLoginDto {
  @ApiProperty()
  @IsString()
  provider: string;

  @ApiProperty()
  @IsString()
  token: string;
}
