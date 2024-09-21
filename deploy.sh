#!/bin/bash

# 경로 이동 (프로젝트 디렉토리로 이동)
cd /home/ubuntu/yuumi-market-api

# GitHub에서 최신 코드 가져오기
git pull origin main

# 의존성 설치 (필요한 경우)
npm install

# 애플리케이션 빌드
npm run build

# PM2로 애플리케이션 무중단 재시작
pm2 reload yuumi-market-api --update-env

# PM2 상태 저장
pm2 save
