import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateIncidentDto, UpdateIncidentDto } from './dto/incident.dto';

@Injectable()
export class IncidentService {
    constructor(private prisma: PrismaService) { }

    async createIncident(dto: CreateIncidentDto, userId: number, componentId: number) {
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

        return this.prisma.incident.create({
            data: {
                ...dto,
                Component: {
                    connect: { id: componentId },
                },
            },
        });
    }

    async updateIncident(id: number, dto: UpdateIncidentDto, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                Component: {
                    page: {
                        userId,
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
                ...dto,
                status: dto.status || incident.status,
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
                Component: {
                    page: {
                        userId,
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
                status: dto.status || incident.status,
                severity: dto.severity,
                resolvedAt: dto.status === 'RESOLVED' ? new Date() : null,
            },
        });

        await this.prisma.incidentStatus.create({
            data: {
                status: dto.statusCode || 0,
                statusMessage: dto.updateMessage || 'No message provided',
                incidentId: id,
            },
        });

        return updatedIncident;
    }


    async deleteIncident(id: number, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                Component: {
                    page: {
                        userId,
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
            where: { componentId },
        });
    }

    async getIncidentById(id: number, userId: number) {
        const incident = await this.prisma.incident.findFirst({
            where: {
                id,
                Component: {
                    page: {
                        userId,
                    },
                },
            },
        });

        if (!incident) {
            throw new NotFoundException('Incident not found or does not belong to you.');
        }

        return incident;
    }
}