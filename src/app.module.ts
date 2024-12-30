import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { PageModule } from './page/page.module';
import { ComponentModule } from './component/component.module';
import { IncidentModule } from './incident/incident.module';
import { AutomationService } from './automation.service';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, PageModule, ComponentModule, IncidentModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AutomationService],
})
export class AppModule { }