import { Module } from '@nestjs/common';
import { FinancialActivitiesController } from './financial-activities.controller';
import { FinancialActivitiesService } from './financial-activities.service';

@Module({
  controllers: [FinancialActivitiesController],
  providers: [FinancialActivitiesService],
  exports: [FinancialActivitiesService],
})
export class FinancialActivitiesModule {}
