import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import {
  CreateLeadDto,
  GetCampaignsQueryDto,
  ImportLeadsDto,
  SearchLeadsQueryDto,
  UpdateLeadDto,
} from './dto/leads.dto';

@Injectable()
export class LeadsService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getCampaigns(query?: GetCampaignsQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.LEADS_CAMPAIGNS,
      query as Record<string, unknown>,
      { token },
    );
  }

  async createLead(dto: CreateLeadDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.LEADS_CREATE, dto, { token });
  }

  async updateLead(leadId: string, dto: UpdateLeadDto, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.LEADS_UPDATE(leadId), dto, { token });
  }

  async searchLeads(query: SearchLeadsQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.LEADS_SEARCH,
      query as Record<string, unknown>,
      { token },
    );
  }

  async importLeads(dto: ImportLeadsDto, file?: Express.Multer.File, token?: string): Promise<unknown> {
    return this.roetoClient.post(
      ROETO_ENDPOINTS.LEADS_IMPORT,
      { ...dto, fileName: file?.originalname },
      { token },
    );
  }
}
