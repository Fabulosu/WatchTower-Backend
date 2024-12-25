import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateComponentDto, UpdateComponentDto, UpdateComponentOrderDto } from './dto/component.dto';

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

        const highestOrder = await this.prisma.component.aggregate({
            where: { pageId },
            _max: { order: true },
        });

        const newOrder = (highestOrder._max.order || 0) + 1;

        return this.prisma.component.create({
            data: {
                ...dto,
                order: newOrder,
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

    async updateComponentOrder(dto: UpdateComponentOrderDto, userId: number) {
        const updatePromises = dto.components.map(async (component) => {
            const existingComponent = await this.prisma.component.findFirst({
                where: {
                    id: component.componentId,
                    page: {
                        userId,
                    },
                },
            });

            if (!existingComponent) {
                throw new NotFoundException(`Component with ID ${component.componentId} not found or does not belong to you.`);
            }

            return this.prisma.component.update({
                where: { id: component.componentId },
                data: {
                    order: component.newOrder,
                },
            });
        });

        return Promise.all(updatePromises);
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

    async getComponents(pageId: number) {
        const page = await this.prisma.page.findFirst({
            where: {
                id: pageId,
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