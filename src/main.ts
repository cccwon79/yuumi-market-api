import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { Reflector } from "@nestjs/core";

dotenv.config();

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
