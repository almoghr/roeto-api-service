import { Body, Controller, Get, Headers, Param, Post, Put, Query } from '@nestjs/common';
import {
  ChangeFinancialActivityStatusDto,
  CreateFinancialActivityDto,
  FetchFinancialActivitiesQueryDto,
  SearchFinancialActivitiesQueryDto,
  UpdateFinancialActivityDto,
} from './dto/financial-activities.dto';
import { FinancialActivitiesService } from './financial-activities.service';

@Controller('financialActivities')
export class FinancialActivitiesController {
  constructor(private readonly financialActivitiesService: FinancialActivitiesService) {}

  @Get('resources')
  async getResources(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.financialActivitiesService.getResources(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('search')
  async searchActivities(
    @Query() query: SearchFinancialActivitiesQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.financialActivitiesService.searchActivities(query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('fetch')
  async fetchActivities(
    @Query() query: FetchFinancialActivitiesQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.financialActivitiesService.fetchActivities(query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('new/:userID')
  async createActivity(
    @Param('userID') userID: string,
    @Body() dto: CreateFinancialActivityDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.financialActivitiesService.createActivity(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put('update/:faId')
  async updateActivity(
    @Param('faId') faId: string,
    @Body() dto: UpdateFinancialActivityDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.financialActivitiesService.updateActivity(faId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put('change-status/:faId')
  async changeStatus(
    @Param('faId') faId: string,
    @Body() dto: ChangeFinancialActivityStatusDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.financialActivitiesService.changeStatus(faId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put('link-with-task/:faId/:taskId')
  async linkWithTask(
    @Param('faId') faId: string,
    @Param('taskId') taskId: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.financialActivitiesService.linkWithTask(faId, taskId, auth?.replace(/^Bearer\s+/i, ''));
  }
}
