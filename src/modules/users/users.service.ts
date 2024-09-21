import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async createUser(createUserDto: any) {
    // 사용자 생성 로직 구현
    return { message: '사용자 생성 성공' };
  }

  async getAllUsers() {
    // 모든 사용자 조회 로직 구현
    return { users: [] };
  }
}
