import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { CheckClientExistenceQueryDto, ClientsByAgentQueryDto } from './dto/agency.dto';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get('agents-list')
  async getAgentsList(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.agencyService.getAgentsList(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('users-list')
  async getUsersList(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.agencyService.getUsersList(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('client-types')
  async getClientTypes(@Headers('authorization') auth?: string): Promise<string[]> {
    return this.agencyService.getClientTypes(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('clients-by-agent/:meshavekItemId')
  async getClientsByAgent(
    @Param('meshavekItemId') meshavekItemId: string,
    @Query() query: ClientsByAgentQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.agencyService.getClientsByAgent(meshavekItemId, query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('check-client-existance')
  async checkClientExistence(
    @Query() query: CheckClientExistenceQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.agencyService.checkClientExistence(query, auth?.replace(/^Bearer\s+/i, ''));
  }
}
