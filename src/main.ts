import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { Reflector } from "@nestjs/core";
import * as dotenv from "dotenv";
import { resolve } from "path";

const logger = new Logger("Bootstrap");

// .env 파일의 절대 경로를 지정합니다.
const envPath = resolve(__dirname, "..", ".env");
logger.log(`Loading .env file from: ${envPath}`);

const result = dotenv.config({ path: envPath });
if (result.error) {
  logger.error("Error loading .env file:", result.error);
} else {
  logger.log(".env file loaded successfully");
}

logger.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);
logger.log("SUPABASE_URL:", process.env.SUPABASE_URL);

if (
  !process.env.SUPABASE_KEY ||
  !process.env.SUPABASE_URL ||
  !process.env.SUPABASE_URL.startsWith("https://")
) {
  logger.error("필수 환경 변수가 설정되지 않았습니다.");
  process.exit(1);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Yuumi Market API")
    .setDescription("Yuumi Market API 문서")
    .setVersion("1.0")
    .addTag("auth")
    .addTag("users")
    .addTag("products")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.enableCors();
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`애플리케이션이 ${port} 포트에서 실행 중입니다.`);
}

bootstrap();
