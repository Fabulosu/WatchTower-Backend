import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateComponentDto, UpdateComponentDto } from './dto/component.dto';

@Injectable()
export class ComponentService {
    constructor(private prisma: PrismaService) { }

    async createComponent(dto: CreateComponentDto, userId: number, pageId: number) {
        const page = await this.prisma.page.findFirst({
            where: {
                id: pageId,
                userId: userId,
            },
        });

        if (!page) {
            throw new UnauthorizedException('This page does not belong to you.');
        }

        return this.prisma.component.create({
            data: {
                ...dto,
                page: {
                    connect: { id: pageId },
                },
            },
        });
    }

    async updateComponent(id: number, dto: UpdateComponentDto, userId: number) {
        const component = await this.prisma.component.findFirst({
            where: {
                id,
                page: {
                    userId,
                },
            },
        });

        if (!component) {
            throw new NotFoundException('Component not found or does not belong to you.');
        }

        return this.prisma.component.update({
            where: { id },
            data: {
                ...dto,
            },
        });
    }

    async deleteComponent(id: number, userId: number) {
        const component = await this.prisma.component.findFirst({
            where: {
                id,
                page: {
                    userId,
                },
            },
        });

        if (!component) {
            throw new NotFoundException('Component not found or does not belong to you.');
        }

        return this.prisma.component.delete({
            where: { id },
        });
    }

    async getComponents(pageId: number, userId: number) {
        const page = await this.prisma.page.findFirst({
            where: {
                id: pageId,
                userId,
            },
        });

        if (!page) {
            throw new UnauthorizedException('This page does not belong to you.');
        }

        return this.prisma.component.findMany({
            where: { pageId },
        });
    }

    async getComponentById(id: number, userId: number) {
        const component = await this.prisma.component.findFirst({
            where: {
                id,
                page: {
                    userId,
                },
            },
        });

        if (!component) {
            throw new NotFoundException('Component not found or does not belong to you.');
        }

        return component;
    }
}