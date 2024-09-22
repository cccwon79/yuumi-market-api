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

## 배포

이 프로젝트는 GitHub Webhook과 자동화된 스크립트를 사용하여 무중단 자동 배포를 지원합니다.

### 배포 순서

1. GitHub에 코드를 푸시합니다.
2. GitHub Webhook이 `/home/ubuntu/webhook/webhook.js` 웹훅 서버로 이벤트를 전송합니다.

```
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

// Webhook 엔드포인트
app.post('/webhook', (req, res) => {
    // Webhook 요청을 받으면 즉시 응답을 보냅니다.
    res.status(200).send('Received!');

    // 비동기로 deploy.sh 실행
    exec('sh /home/ubuntu/yuumi-market-api/deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});

app.listen(3001, () => {
    console.log('Webhook server is listening on port 3001');
});

```

3. 웹훅 서버가 `/home/ubuntu/yuumi-market-api/deploy.sh` 스크립트를 실행합니다.

```
#!/bin/bash

# 배포할 브랜치 설정
branch=${refs/heads/main}

# 경로 이동 (프로젝트 디렉토리로 이동)
cd /home/ubuntu/yuumi-market-api

# GitHub에서 main 브랜치의 최신 코드 가져오기
git --git-dir=/home/ubuntu/yuumi-market-api/.git pull origin ${branch}

# 의존성 설치 (필요한 경우)
npm install

# 애플리케이션 빌드
npm run build

# PM2로 애플리케이션 무중단 재시작
pm2 reload yuumi-market-api --update-env

# PM2 상태 저장
pm2 save
```

이 과정을 통해 코드 변경 사항이 자동으로 서버에 적용되며, 서비스 중단 없이 배포가 이루어집니다.

### 웹훅 서버 설정

웹훅 서버는 `/home/ubuntu/webhook/webhook.js`에 위치하며, GitHub에서 오는 이벤트를 수신하고 처리합니다. 이 서버는 보안을 위해 비밀 토큰을 사용하여 요청을 검증합니다.

### 배포 스크립트

배포 스크립트 `/home/ubuntu/yuumi-market-api/deploy.sh`는 실제 배포 과정을 자동화합니다. 이 스크립트는 코드 업데이트, 의존성 설치, 데이터베이스 마이그레이션, 그리고 서버 재시작을 담당합니다.

이 자동화된 배포 시스템을 통해 개발자는 코드를 푸시하는 것만으로 변경 사항을 실시간으로 프로덕션 환경에 반영할 수 있습니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다.
