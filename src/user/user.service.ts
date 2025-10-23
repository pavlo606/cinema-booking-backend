import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        return this.prisma.user.create({
            data,
        });
    }
    
    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async findByIdSafe(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            role: user?.role,
            refreshToken: user?.refreshToken,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
        };
    }

    async findById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async updateRefreshToken(
        id: number,
        data: Partial<{ refreshToken: string | null }>,
    ) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async update(id: number, data: UpdateUserDto) {
        if (
            data.username === undefined &&
            data.email === undefined &&
            data.role === undefined &&
            data.password_hash === undefined
        )
            throw new BadRequestException(
                "You need to specify at least one field",
            );

        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
}
