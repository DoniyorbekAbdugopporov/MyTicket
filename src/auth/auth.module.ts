import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { CustomerModule } from "../customer/customer.module";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    // forwardRef // ikkala tomondan foydalanish
    UsersModule,
    AdminModule,
    CustomerModule,
    JwtModule.register({
      global: true,
      secret: "MySecretKey",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
