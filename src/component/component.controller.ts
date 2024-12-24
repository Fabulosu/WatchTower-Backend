import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ComponentService } from './component.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';
import { Request } from 'express';

@Controller('component')
// @UseGuards(JwtGuard)
export class ComponentController {
    constructor(private componentService: ComponentService) { }

    @UseGuards(JwtGuard)
    @Post(':pageId')
    async createComponent(@Body() dto: CreateComponentDto, @Param('pageId') pageId: number, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.componentService.createComponent(dto, userId, pageId);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updateComponent(@Param('id') id: number, @Body() dto: UpdateComponentDto, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.componentService.updateComponent(id, dto, userId);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteComponent(@Param('id') id: number, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.componentService.deleteComponent(id, userId);
    }

    @Get('page/:pageId')
    async getComponents(@Param('pageId') pageId: number, @Req() req: Request) {
        return await this.componentService.getComponents(pageId);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getComponentById(@Param('id') id: number, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.componentService.getComponentById(id, userId);
    }
}