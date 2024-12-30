import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { };

    @UseGuards(JwtGuard)
    @Get(":id")
    async getUserProfile(@Param("id") id: number) {
        return await this.userService.findById(id);
    }

    @Get("exists/:username")
    async getUser(@Param("username") username: string) {
        return await this.userService.findUser(username);
    }
}
