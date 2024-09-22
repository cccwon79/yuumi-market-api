import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { Reflector } from "@nestjs/core";
import * as dotenv from "dotenv";
import { resolve } from "path";

// .env 파일의 절대 경로를 지정합니다.
const envPath = resolve(__dirname, "..", ".env");
console.log("Loading .env file from:", envPath);

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log(".env file loaded successfully");
}

console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY);

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

  await app.listen(3000);
}

bootstrap();
