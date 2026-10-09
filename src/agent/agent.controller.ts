import { Controller, Get, Headers, Query } from '@nestjs/common';
import { AgentService } from './agent.service';
import { AgentDashboardQueryDto } from './dto/agent-dashboard.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get('dashboard')
  async getDashboard(
    @Query() query: AgentDashboardQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.agentService.getDashboard(query, auth?.replace(/^Bearer\s+/i, ''));
  }
}
