import { Injectable, Logger } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import {
  CellosignFormSignatureWebhookDto,
  CellosignSessionExpiredWebhookDto,
} from './dto/cellosign.dto';

@Injectable()
export class CellosignService {
  private readonly logger = new Logger(CellosignService.name);

  constructor(private readonly roetoClient: RoetoClientService) {}

  /**
   * Forwards or processes Cellosign form signature webhook.
   */
  async handleFormSignature(dto: CellosignFormSignatureWebhookDto): Promise<unknown> {
    this.logger.log(`Received signed form webhook from Cellosign: ref=${dto.reference}`);
    return this.roetoClient.post(ROETO_ENDPOINTS.CELLOSIGN_FORM_SIGNATURE, dto, { skipAuth: true });
  }

  /**
   * Forwards or processes Cellosign session expired webhook.
   */
  async handleSessionExpired(dto: CellosignSessionExpiredWebhookDto): Promise<unknown> {
    this.logger.log(`Received session expired webhook from Cellosign: ref=${dto.session?.reference}`);
    return this.roetoClient.post(ROETO_ENDPOINTS.CELLOSIGN_SESSION_EXPIRED, dto, { skipAuth: true });
  }
}
