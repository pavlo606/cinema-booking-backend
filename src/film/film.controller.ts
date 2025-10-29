import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UploadedFile,
    UseInterceptors,
    BadRequestException,
} from "@nestjs/common";
import { FilmService } from "./film.service";
import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { RolesGuard } from "@/auth/guards/roles.guard";
import { Roles } from "@/auth/roles.decorator";
import { Role } from "@/auth/roles.enum";
import { StorageService } from "@/storage/storage.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Films")
@Controller("film")
export class FilmController {
    constructor(
        private readonly filmService: FilmService,
        private readonly storageService: StorageService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor("poster"))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                poster: {
                    type: "string",
                    format: "binary",
                },
                data: {
                    type: "string",
                    example: JSON.stringify({
                        name: "Film",
                        description: "Mind-bending description",
                        duration: 200,
                        genre: "genre",
                    }),
                },
            },
        },
    })
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN)
    async create(
        @UploadedFile() poster: Express.Multer.File,
        @Body("data") data: string,
    ) {
        let uri: string | undefined = undefined;
        if (poster) {
            uri = await this.storageService.upload(poster);
        }
        const parsed = JSON.parse(data || "{}");
        const dto = plainToInstance(CreateFilmDto, {...parsed, posterURL: uri})
        try {
            await validateOrReject(dto);
            return this.filmService.create(dto);
        } catch (err) {
            throw new BadRequestException("Invalid parameters")
        }
    }

    @Get()
    async findAll() {
        return this.filmService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.filmService.findOne(+id);
    }

    @Patch(":id")
    @UseInterceptors(FileInterceptor("poster"))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                poster: {
                    type: "string",
                    format: "binary",
                },
                data: {
                    type: "string",
                    example: JSON.stringify({
                        name: "Film",
                        description: "Mind-bending description",
                        duration: 200,
                        genre: "genre",
                    }),
                },
            },
        },
    })
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN)
    async update(
        @Param("id") id: string,
        @UploadedFile() poster: Express.Multer.File,
        @Body("data") data: string,
    ) {
        let uri: string | undefined = undefined;
        if (poster) {
            uri = await this.storageService.upload(poster);
        }
        const parsed = JSON.parse(data || "{}");
        const dto = plainToInstance(UpdateFilmDto, {...parsed, posterURL: uri})
        try {
            await validateOrReject(dto);
            return this.filmService.update(+id, dto);
        } catch (err) {
            throw new BadRequestException("You need to specify at least one field")
        }
    }

    @Delete(":id")
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN)
    async remove(@Param("id") id: string) {
        return this.filmService.remove(+id);
    }
}
