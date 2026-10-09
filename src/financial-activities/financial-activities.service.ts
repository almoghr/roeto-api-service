import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import {
  ChangeFinancialActivityStatusDto,
  CreateFinancialActivityDto,
  FetchFinancialActivitiesQueryDto,
  SearchFinancialActivitiesQueryDto,
  UpdateFinancialActivityDto,
} from './dto/financial-activities.dto';

@Injectable()
export class FinancialActivitiesService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getResources(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_RESOURCES, undefined, { token });
  }

  async searchActivities(query: SearchFinancialActivitiesQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_SEARCH,
      query as Record<string, unknown>,
      { token },
    );
  }

  async fetchActivities(query: FetchFinancialActivitiesQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_FETCH,
      query as Record<string, unknown>,
      { token },
    );
  }

  async createActivity(
    userID: string,
    dto: CreateFinancialActivityDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_CREATE(userID), dto, { token });
  }

  async updateActivity(
    faId: string,
    dto: UpdateFinancialActivityDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_UPDATE(faId), dto, { token });
  }

  async changeStatus(
    faId: string,
    dto: ChangeFinancialActivityStatusDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_CHANGE_STATUS(faId), dto, { token });
  }

  async linkWithTask(faId: string, taskId: string, token?: string): Promise<unknown> {
    return this.roetoClient.put(
      ROETO_ENDPOINTS.FINANCIAL_ACTIVITIES_LINK_WITH_TASK(faId, taskId),
      {},
      { token },
    );
  }
}
