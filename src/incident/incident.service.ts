import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateIncidentDto, UpdateIncidentDto } from './dto/incident.dto';

@Injectable()
export class IncidentService {
    constructor(private prisma: PrismaService) { }

    async createIncident(dto: CreateIncidentDto, userId: number, componentIds: number[]) {
        const components = await this.prisma.component.findMany({
            where: {
                id: { in: componentIds },
                page: {
                    userId,
                },
            },
        });

        if (components.length === 0 || components.length !== componentIds.length) {
            throw new UnauthorizedException('Some components do not belong to you.');
        }

        const incident = await this.prisma.incident.create({
            data: {
                name: dto.name,
                severity: dto.severity,
                scheduleAt: dto.scheduleAt ? new Date(dto.scheduleAt) : undefined,
                resolvedAt: dto.resolvedAt ? new Date(dto.resolvedAt) : undefined,
                components: {
                    connect: componentIds.map((id) => ({ id })),
                },
                pageId: dto.pageId
            },
        });

        await this.prisma.incidentStatus.create({
            data: {
                incidentId: incident.id,
                status: dto.statusCode || 0,
                statusMessage: dto.statusMessage || 'We are currently investigating this issue and will provide updates as soon as possible.',
            },
        });

        return incident;

    }

    async updateIncident(id: number, dto: UpdateIncidentDto, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                components: {
                    some: {
                        page: {
                            userId,
                        },
                    },
                },
            },
        });

        if (!incident) {
            throw new NotFoundException('Incident not found or does not belong to you.');
        }

        const updatedIncident = await this.prisma.incident.update({
            where: { id },
            data: {
                name: dto.name,
                severity: dto.severity,
                scheduleAt: dto.scheduleAt ? new Date(dto.scheduleAt) : undefined,
                resolvedAt: dto.resolvedAt ? new Date(dto.resolvedAt) : undefined,
                components: dto.components ? {
                    update: dto.components.map((component) => ({
                        where: { id: component.id },
                        data: { status: component.status },
                    })),
                } : undefined,
            },
        });

        if (dto.statusCode || dto.updateMessage) {
            await this.prisma.incidentStatus.create({
                data: {
                    incidentId: id,
                    status: dto.statusCode || 0,
                    statusMessage: dto.updateMessage || 'No message provided',
                },
            });
        }

        return updatedIncident;
    }

    async updateIncidentStatus(id: number, dto: UpdateIncidentDto, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                components: {
                    some: {
                        page: {
                            userId,
                        },
                    },
                },
            },
        });

        if (!incident) {
            throw new NotFoundException('Incident not found or does not belong to you.');
        }

        const updatedIncident = await this.prisma.incident.update({
            where: { id },
            data: {
                severity: dto.severity,
                resolvedAt: dto.statusCode === 3 ? new Date() : null,
            },
        });

        await this.prisma.incidentStatus.create({
            data: {
                status: dto.statusCode || 0,
                statusMessage: dto.updateMessage || 'No message provided',
                incidentId: id,
            },
        });

        if (dto.components) {
            for (const component of dto.components) {
                await this.prisma.component.update({
                    where: { id: component.id },
                    data: { status: component.status },
                });
            }
        }

        return updatedIncident;
    }

    async deleteIncident(id: number, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                components: {
                    some: {
                        page: {
                            userId,
                        },
                    },
                },
            },
        });

        if (!incident) {
            throw new NotFoundException('Incident not found or does not belong to you.');
        }

        return this.prisma.incident.delete({
            where: { id },
        });
    }

    async getIncidents(componentId: number, userId: number) {
        const component = await this.prisma.component.findFirst({
            where: {
                id: componentId,
                page: {
                    userId,
                },
            },
        });

        if (!component) {
            throw new UnauthorizedException('This component does not belong to you.');
        }

        return this.prisma.incident.findMany({
            where: {
                components: {
                    some: { id: componentId },
                },
            },
        });
    }

    async getPageIncidents(pageId: number, userId: number) {
        const page = await this.prisma.page.findFirst({
            where: {
                id: pageId,
                userId: userId,
            },
        });

        if (!page) {
            throw new UnauthorizedException('This page does not belong to you.');
        }

        return this.prisma.incident.findMany({
            where: { pageId },
            include: {
                components: true,
                history: true,
            }
        });
    }

    async getIncidentById(id: number, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                components: {
                    some: {
                        page: {
                            userId,
                        },
                    },
                },
            },
            include: {
                components: true,
                history: true,
            }
        });

        if (!incident) {
            throw new NotFoundException('Incident not found or does not belong to you.');
        }

        return incident;
    }
}