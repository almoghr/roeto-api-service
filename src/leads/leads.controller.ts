import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateLeadDto,
  GetCampaignsQueryDto,
  ImportLeadsDto,
  SearchLeadsQueryDto,
  UpdateLeadDto,
} from './dto/leads.dto';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('campaigns')
  async getCampaigns(
    @Query() query: GetCampaignsQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.leadsService.getCampaigns(query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('lead')
  async createLead(
    @Body() dto: CreateLeadDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.leadsService.createLead(dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put('lead/:leadId')
  async updateLead(
    @Param('leadId') leadId: string,
    @Body() dto: UpdateLeadDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.leadsService.updateLead(leadId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('leads/search')
  async searchLeads(
    @Query() query: SearchLeadsQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.leadsService.searchLeads(query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importLeads(
    @Body() dto: ImportLeadsDto,
    @UploadedFile() file?: Express.Multer.File,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.leadsService.importLeads(dto, file, auth?.replace(/^Bearer\s+/i, ''));
  }
}
