import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // guard logikasi yoziladi

    const requiredRole = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler,
      context.getClass,
    ]);

    if (!requiredRole) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "Headerda Token berilmagan" });
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException({
        message: "Bearer va token berilmagan!",
      });
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Token verifikatsiyadan o'tmadi!",
        error,
      });
    }
    request.user = payload;

    const permission = payload.roles.some((role: any) =>
      requiredRole.includes(role.value)
    );

    if (!permission) {
      throw new ForbiddenException({
        message: "Ruxsat etilmagan role!",
      });
    }

    return true;
  }
}
