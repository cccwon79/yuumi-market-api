import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
