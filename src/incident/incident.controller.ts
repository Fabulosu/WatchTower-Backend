import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateIncidentDto, UpdateIncidentDto } from './dto/incident.dto';
import { Request } from 'express';

@Controller('incident')
@UseGuards(JwtGuard)
export class IncidentController {
    constructor(private incidentService: IncidentService) { }

    // Create Incident for multiple components
    @Post()
    async createIncident(
        @Body() dto: CreateIncidentDto,
        @Body('componentIds') componentIds: number[], // Extract componentIds from body
        @Req() req: Request,
    ) {
        const userId = req['user'].id;
        return await this.incidentService.createIncident(dto, userId, componentIds);
    }

    // Update Incident Status
    @Put('status/:id')
    async updateIncidentStatus(@Param('id') id: number, @Body() dto: UpdateIncidentDto, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.incidentService.updateIncidentStatus(id, dto, userId);
    }

    // Update Incident
    @Put(':id')
    async updateIncident(@Param('id') id: number, @Body() dto: UpdateIncidentDto, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.incidentService.updateIncident(id, dto, userId);
    }

    // Delete Incident
    @Delete(':id')
    async deleteIncident(@Param('id') id: number, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.incidentService.deleteIncident(id, userId);
    }

    // Get Incidents for a specific component
    @Get('component/:componentId')
    async getIncidents(@Param('componentId') componentId: number, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.incidentService.getIncidents(componentId, userId);
    }

    // Get Incident by ID
    @Get(':id')
    async getIncidentById(@Param('id') id: number, @Req() req: Request) {
        const userId = req['user'].id;
        return await this.incidentService.getIncidentById(id, userId);
    }
}