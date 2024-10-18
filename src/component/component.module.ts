import { Module } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentController } from './component.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ComponentService, PrismaService, JwtService],
  controllers: [ComponentController],
})
export class ComponentModule { }