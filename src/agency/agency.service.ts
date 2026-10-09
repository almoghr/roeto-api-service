import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { CheckClientExistenceQueryDto, ClientsByAgentQueryDto } from './dto/agency.dto';

@Injectable()
export class AgencyService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getAgentsList(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.AGENCY_AGENTS_LIST, undefined, { token });
  }

  async getUsersList(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.AGENCY_USERS_LIST, undefined, { token });
  }

  async getClientTypes(token?: string): Promise<string[]> {
    return this.roetoClient.get<string[]>(ROETO_ENDPOINTS.AGENCY_CLIENT_TYPES, undefined, { token });
  }

  async getClientsByAgent(
    meshavekItemId: string,
    query?: ClientsByAgentQueryDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.AGENCY_CLIENTS_BY_AGENT(meshavekItemId),
      query as Record<string, unknown>,
      { token },
    );
  }

  async checkClientExistence(
    query: CheckClientExistenceQueryDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.AGENCY_CHECK_CLIENT_EXISTANCE,
      query as Record<string, unknown>,
      { token },
    );
  }
}
