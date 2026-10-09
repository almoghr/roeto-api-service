import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { SearchEmployersQueryDto } from './dto/employers.dto';

@Injectable()
export class EmployersService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async searchEmployers(query: SearchEmployersQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(
      ROETO_ENDPOINTS.EMPLOYERS,
      query as Record<string, unknown>,
      { token },
    );
  }
}
