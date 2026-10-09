import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { AgencyModule } from './agency/agency.module';
import { AgentModule } from './agent/agent.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CellosignModule } from './cellosign/cellosign.module';
import { ClientsModule } from './clients/clients.module';
import { RoetoExceptionFilter } from './common/errors/roeto-exception.filter';
import { HebrewResponseInterceptor } from './common/interceptors/hebrew-response.interceptor';
import { roetoConfig } from './config/roeto.config';
import { EmployersModule } from './employers/employers.module';
import { FinancialActivitiesModule } from './financial-activities/financial-activities.module';
import { LeadsModule } from './leads/leads.module';
import { MislakaModule } from './mislaka/mislaka.module';
import { RoetoClientModule } from './roeto-client/roeto-client.module';
import { RoetoPolModule } from './roeto-pol/roeto-pol.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [roetoConfig],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120,
      },
    ]),
    RoetoClientModule,
    AuthModule,
    AgencyModule,
    AgentModule,
    ClientsModule,
    MislakaModule,
    RoetoPolModule,
    CellosignModule,
    EmployersModule,
    LeadsModule,
    FinancialActivitiesModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: RoetoExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HebrewResponseInterceptor,
    },
  ],
})
export class AppModule {}
