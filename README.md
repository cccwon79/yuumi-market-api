<p align="center">
  <img src="public/images/supa-nest-prisma.png" alt="Yuumi Market API 로고" width="200" height="200">
</p>

<h1 align="center">Yuumi Market API</h1>

<p align="center">
  Nest.js | Prisma | Supabase | Swagger
</p>

<p align="center">
  Yuumi Market API는 Nest.js, Prisma, Supabase를 사용하여 구축된 강력한 백엔드 API입니다.
</p>

## 기능

- 사용자 인증 및 권한 부여
- 제품 관리
- 주문 처리
- 실시간 업데이트
- Swagger를 통한 API 문서화

## 시작하기

이 섹션에서는 프로젝트를 로컬 환경에서 실행하는 방법을 설명합니다.

### 전제 조건

- Node.js
- npm 또는 yarn
- Supabase 계정

### 설치

1. 리포지토리를 클론합니다:

   ```
   git clone https://github.com/cccwon79/yuumi-market-api.git
   ```

2. 프로젝트 디렉토리로 이동합니다:

   ```
   cd yuumi-market-api
   ```

3. 종속성을 설치합니다:

   ```
   npm install
   ```

4. 환경 변수를 설정합니다:

   ```
   cp .env.example .env
   ```

   `.env` 파일을 열고 필요한 환경 변수를 입력합니다.

5. 데이터베이스를 마이그레이션합니다:

   ```
   npx prisma migrate dev
   ```

6. 서버를 실행합니다:
   ```
   npm run start:dev
   ```

이제 API가 `http://localhost:3000`에서 실행됩니다.

### Swagger 문서

API 문서는 Swagger를 통해 제공됩니다. 서버 실행 후 다음 URL에서 확인할 수 있습니다:

```
http://localhost:3000/docs
```

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다.
