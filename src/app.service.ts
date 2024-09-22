import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "<a href='/docs'>Yuumi Market API에 오신 것을 환영합니다.</a>";
  }
}
