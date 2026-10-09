import { Body, Controller, Post } from '@nestjs/common';
import { CellosignService } from './cellosign.service';
import {
  CellosignFormSignatureWebhookDto,
  CellosignSessionExpiredWebhookDto,
} from './dto/cellosign.dto';

@Controller('cellosign')
export class CellosignController {
  constructor(private readonly cellosignService: CellosignService) {}

  @Post('form-signature')
  async handleFormSignature(@Body() dto: CellosignFormSignatureWebhookDto): Promise<unknown> {
    return this.cellosignService.handleFormSignature(dto);
  }

  @Post('session-expired')
  async handleSessionExpired(@Body() dto: CellosignSessionExpiredWebhookDto): Promise<unknown> {
    return this.cellosignService.handleSessionExpired(dto);
  }
}
