import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtGuard)
@Controller('page')
export class PageController {
    constructor(private pageService: PageService) { }

    @Post()
    @UseGuards(JwtGuard)
    async createPage(@Body() dto: CreatePageDto, @Req() req: Request) {
        const userId = req['user'].id;
        if (!userId) {
            throw new UnauthorizedException('Invalid user.');
        }
        return await this.pageService.createPage(dto, userId);
    }

    @UseGuards(JwtGuard)
    @Get('user/:userId')
    async getPages(@Param('userId') userId: number) {
        return await this.pageService.getPages(userId);
    }

    @Get(':id')
    async getPage(@Param('id') id: number) {
        return await this.pageService.getPage(id);
    }

    @Put(':id')
    @UseGuards(JwtGuard)
    async updatePage(@Param('id') id: number, @Body() dto: UpdatePageDto) {
        return await this.pageService.updatePage(id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async deletePage(@Param('id') id: number) {
        return await this.pageService.deletePage(id);
    }
}