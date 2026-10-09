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
import { ClientsService } from './clients.service';
import {
  AddClientNoteDto,
  AssignAgentDto,
  AssignEmployerDto,
  AssignGoremMetapelDto,
  ChangeClientTypeDto,
  CreateActiveClientDto,
  CreateMislakaB1RequestDto,
  CreateMislakaRequestDto,
  CreateTromYeutzClientDto,
  SearchClientsQueryDto,
  SetIdIssueDateDto,
  UpdateActiveClientDetailsDto,
  UpdateTromYeutzDetailsDto,
  UploadClientFileMetadataDto,
} from './dto/clients.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('birthdays')
  async getBirthdays(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.clientsService.getBirthdays(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('search')
  async searchClients(
    @Query() query: SearchClientsQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.searchClients(query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('portfolio/:userID')
  async getPortfolio(
    @Param('userID') userID: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.getPortfolio(userID, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/notes')
  async addNote(
    @Param('userID') userID: string,
    @Body() dto: AddClientNoteDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.addNote(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('tromYeutz/portfolio/:userID')
  async getTromYeutzPortfolio(
    @Param('userID') userID: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.getTromYeutzPortfolio(userID, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get(':userID/check-mislaka-prerequisites/:accountId')
  async checkMislakaPrerequisites(
    @Param('userID') userID: string,
    @Param('accountId') accountId: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.checkMislakaPrerequisites(userID, accountId, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/create-mislaka-request/:accountId')
  async createMislakaRequest(
    @Param('userID') userID: string,
    @Param('accountId') accountId: string,
    @Body() dto: CreateMislakaRequestDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.createMislakaRequest(userID, accountId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get(':userID/latest-mislaka-request-files')
  async getLatestMislakaRequestFiles(
    @Param('userID') userID: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.getLatestMislakaRequestFiles(userID, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/create-mislaka-b1-request/:accountId')
  async createMislakaB1Request(
    @Param('userID') userID: string,
    @Param('accountId') accountId: string,
    @Body() dto: CreateMislakaB1RequestDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.createMislakaB1Request(userID, accountId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('create-trom-yeutz-client')
  async createTromYeutzClient(
    @Body() dto: CreateTromYeutzClientDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.createTromYeutzClient(dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('create-active-client')
  async createActiveClient(
    @Body() dto: CreateActiveClientDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.createActiveClient(dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put('convert-trom-to-active/:userID')
  async convertTromToActive(
    @Param('userID') userID: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.convertTromToActive(userID, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('assign-agent')
  async assignAgent(
    @Body() dto: AssignAgentDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.assignAgent(dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put(':userID/goremMetapel')
  async assignGoremMetapel(
    @Param('userID') userID: string,
    @Body() dto: AssignGoremMetapelDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.assignGoremMetapel(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/update-details')
  async updateActiveClientDetails(
    @Param('userID') userID: string,
    @Body() dto: UpdateActiveClientDetailsDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.updateActiveClientDetails(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/change-active-client-type')
  async changeActiveClientType(
    @Param('userID') userID: string,
    @Body() dto: ChangeClientTypeDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.changeActiveClientType(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/update-trom-yeutz-details')
  async updateTromYeutzDetails(
    @Param('userID') userID: string,
    @Body() dto: UpdateTromYeutzDetailsDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.updateTromYeutzDetails(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/set-id-issue-date')
  async setIdIssueDate(
    @Param('userID') userID: string,
    @Body() dto: SetIdIssueDateDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.setIdIssueDate(userID, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('assign-employer')
  async assignEmployer(
    @Body() dto: AssignEmployerDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.assignEmployer(dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('by-employer/:employerId')
  async getClientsByEmployer(
    @Param('employerId') employerId: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.getClientsByEmployer(employerId, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/upload-file-tromYeutz-client')
  @UseInterceptors(FileInterceptor('file'))
  async uploadTromYeutzFile(
    @Param('userID') userID: string,
    @Body() dto: UploadClientFileMetadataDto,
    @UploadedFile() file?: Express.Multer.File,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.uploadTromYeutzFile(userID, dto, file, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post(':userID/upload-file-active-client')
  @UseInterceptors(FileInterceptor('file'))
  async uploadActiveClientFile(
    @Param('userID') userID: string,
    @Body() dto: UploadClientFileMetadataDto,
    @UploadedFile() file?: Express.Multer.File,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.clientsService.uploadActiveClientFile(userID, dto, file, auth?.replace(/^Bearer\s+/i, ''));
  }
}
