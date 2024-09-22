import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "<a href='/docs'> Welcome to Yuumi Market API</a>";
  }
}
