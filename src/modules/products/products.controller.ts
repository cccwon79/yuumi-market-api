import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "상품 생성" })
  @ApiResponse({ status: 201, description: "상품 생성 성공" })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: "모든 상품 조회" })
  @ApiResponse({ status: 200, description: "상품 목록 반환" })
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }
}
