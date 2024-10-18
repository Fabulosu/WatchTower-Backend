import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentController } from './incident.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [IncidentService, PrismaService, JwtService],
  controllers: [IncidentController],
})
export class IncidentModule { }