import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { RequestFormSignatureDto, RequestHarBituachDto } from './dto/roeto-pol.dto';

@Injectable()
export class RoetoPolService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getAccounts(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.ROETO_POL_ACCOUNTS, undefined, { token });
  }

  async requestFormSignature(
    userID: string,
    dto: RequestFormSignatureDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.ROETO_POL_FORM_SIGNATURE(userID), dto, { token });
  }

  async requestHarBituach(
    userID: string,
    dto: RequestHarBituachDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.ROETO_POL_HAR_BITUACH(userID), dto, { token });
  }
}
