import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { AgentDashboardQueryDto } from './dto/agent-dashboard.dto';

@Injectable()
export class AgentService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getDashboard(query?: AgentDashboardQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.AGENT_DASHBOARD,
      query as Record<string, unknown>,
      { token },
    );
  }
}
