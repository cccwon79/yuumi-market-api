import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { ProductsModule } from "./modules/products/products.module";
import { SupabaseModule } from "./modules/supabase/supabase.module";

@Module({
  imports: [AuthModule, UsersModule, ProductsModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
