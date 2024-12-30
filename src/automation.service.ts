import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AutomationService {
    constructor(private prisma: PrismaService) {
        this.scheduleTasks();
    }

    async processScheduledIncidents() {
        const now = new Date();

        const incidents = await this.prisma.incident.findMany({
            where: {
                scheduledAt: { lte: now },
                resolvedAt: null,
                auto_start: true,
            },
            include: {
                components: true,
                history: true,
            },
        });

        const scheduledIncidents = incidents.filter((incident) => {
            if (!incident.history || incident.history.length === 0) {
                return false;
            }

            const lastHistory = incident.history.sort(
                (a, b) => b.id - a.id
            )[0];

            return lastHistory.status === 0;
        });

        for (const incident of scheduledIncidents) {
            await this.prisma.incidentStatus.create({
                data: {
                    incidentId: incident.id,
                    status: 1,
                    statusMessage: 'Scheduled maintenance is currently in progress. We will provide updates as necessary.',
                },
            });

            for (const component of incident.components) {
                const lastComponentStatus = await this.prisma.componentStatus.findFirst({
                    where: { componentId: component.id },
                    orderBy: { assignedAt: 'desc' },
                });

                if (lastComponentStatus) {
                    await this.prisma.componentStatus.update({
                        where: { id: lastComponentStatus.id },
                        data: { removedAt: new Date() },
                    });
                }

                await this.prisma.component.update({
                    where: { id: component.id },
                    data: { status: 5 },
                });

                await this.prisma.componentStatus.create({
                    data: {
                        componentId: component.id,
                        status: 5,
                    },
                });
            }
        }

        const completedIncidents = await this.prisma.incident.findMany({
            where: {
                completeAt: { lte: now },
                resolvedAt: null,
                auto_end: true,
            },
            include: {
                components: true,
            },
        });

        for (const incident of completedIncidents) {
            await this.prisma.incident.update({
                where: { id: incident.id },
                data: { resolvedAt: new Date() },
            });
        }

        for (const incident of completedIncidents) {
            await this.prisma.incidentStatus.create({
                data: {
                    incidentId: incident.id,
                    status: 3,
                    statusMessage: 'The scheduled maintenance has been completed.',
                },
            });

            for (const component of incident.components) {
                const lastComponentStatus = await this.prisma.componentStatus.findFirst({
                    where: { componentId: component.id },
                    orderBy: { assignedAt: 'desc' },
                });

                if (lastComponentStatus) {
                    await this.prisma.componentStatus.update({
                        where: { id: lastComponentStatus.id },
                        data: { removedAt: new Date() },
                    });
                }

                await this.prisma.component.update({
                    where: { id: component.id },
                    data: { status: 1 },
                });

                await this.prisma.componentStatus.create({
                    data: {
                        componentId: component.id,
                        status: 1,
                    },
                });
            }
        }
    }

    scheduleTasks() {
        cron.schedule('* * * * *', async () => {
            await this.processScheduledIncidents();
        });
    }
}