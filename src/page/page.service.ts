import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePageDto, UpdatePageDto } from './dto/page.dto';

@Injectable()
export class PageService {
    constructor(private prisma: PrismaService) { }

    async createPage(dto: CreatePageDto, userId: number) {
        return await this.prisma.page.create({
            data: {
                ...dto,
                userId: userId,
            },
        });
    }

    async getPages(userId: number) {
        const pages = await this.prisma.page.findMany({
            where: { userId },
            include: {
                components: {
                    include: {
                        incidents: {
                            include: {
                                history: true,
                            },
                        },
                    },
                },
            },
        });
        if (!pages) throw new NotFoundException('No pages found');
        return pages;
    };

    async getPage(id: number) {
        const page = await this.prisma.page.findUnique({
            where: { id },
            include: {
                components: {
                    include: {
                        incidents: {
                            include: {
                                history: true,
                            }
                        }
                    }
                },
            }
        });
        if (!page) throw new NotFoundException('Page not found');
        return page;
    }

    async updatePage(id: number, dto: UpdatePageDto) {
        const page = await this.prisma.page.findUnique({
            where: { id },
        });
        if (!page) throw new NotFoundException('Page not found');

        return await this.prisma.page.update({
            where: { id },
            data: { ...dto },
        });
    }

    async deletePage(id: number) {
        const page = await this.prisma.page.findUnique({
            where: { id },
        });
        if (!page) throw new NotFoundException('Page not found');

        return await this.prisma.page.delete({
            where: { id },
        });
    }
}