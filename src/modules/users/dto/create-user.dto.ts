import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;
}
