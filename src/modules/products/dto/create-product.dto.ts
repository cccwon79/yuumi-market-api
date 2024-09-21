import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsPositive } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "상품 이름", example: "팬더 인형" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: "상품 설명", example: "귀여운 팬더 인형입니다." })
  @IsString()
  description: string;

  @ApiProperty({ description: "상품 가격", example: 15000 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: "재고 수량", example: 100 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;
}
