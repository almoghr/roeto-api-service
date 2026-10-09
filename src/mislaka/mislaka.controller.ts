import { Controller, Get, Headers } from '@nestjs/common';
import { MislakaService } from './mislaka.service';

@Controller('mislaka')
export class MislakaController {
  constructor(private readonly mislakaService: MislakaService) {}

  @Get('connection')
  async getConnection(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.mislakaService.getConnection(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('companies-list')
  async getCompaniesList(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.mislakaService.getCompaniesList(auth?.replace(/^Bearer\s+/i, ''));
  }
}
