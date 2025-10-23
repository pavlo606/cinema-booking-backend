import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../roles.decorator";
import { Role } from "../roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // 1. Отримуємо список дозволених ролей з декоратора
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        console.log(`Reuired roles: ${requiredRoles}`)

        if (!requiredRoles) {
            return true; // Якщо ролі не вказані — доступ вільний
        }

        // 2. Отримуємо користувача, встановленого JwtAuthGuard
        const { user } = context.switchToHttp().getRequest();

        if (!user) throw new ForbiddenException("User not found");
        console.log(`User role: ${user.role}`)

        // 3. Перевіряємо роль
        const hasRole = requiredRoles.includes(user.role);

        if (!hasRole) {
            throw new ForbiddenException("You do not have permission");
        }

        return true;
    }
}
