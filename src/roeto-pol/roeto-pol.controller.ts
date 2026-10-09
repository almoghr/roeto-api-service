import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { RequestFormSignatureDto, RequestHarBituachDto } from './dto/roeto-pol.dto';
import { RoetoPolService } from './roeto-pol.service';

@Controller('roeto-pol')
export class RoetoPolController {
  constructor(private readonly roetoPolService: RoetoPolService) {}

  @Get('accounts')
  async getAccounts(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.roetoPolService.getAccounts(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('form-signature/:userID')
  async requestFormSignature(
    @Param('userID') userID: string,
    @Body() dto: RequestFormSignatureDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.roetoPolService.requestFormSignature(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('har-bituach/:userID')
  async requestHarBituach(
    @Param('userID') userID: string,
    @Body() dto: RequestHarBituachDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.roetoPolService.requestHarBituach(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }
}
