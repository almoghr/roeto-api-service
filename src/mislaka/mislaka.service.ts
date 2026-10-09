import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';

@Injectable()
export class MislakaService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getConnection(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.MISLAKA_CONNECTION, undefined, { token });
  }

  async getCompaniesList(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.MISLAKA_COMPANIES_LIST, undefined, { token });
  }
}
