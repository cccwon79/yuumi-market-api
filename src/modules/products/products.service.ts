import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {
  async createProduct(createProductDto: CreateProductDto) {
    // 상품 생성 로직 구현
    return { message: "상품 생성 성공", product: createProductDto };
  }

  async getAllProducts() {
    // 모든 상품 조회 로직 구현
    return { products: [] };
  }
}
