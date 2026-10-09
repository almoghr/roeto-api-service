import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
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

@Injectable()
export class ClientsService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getBirthdays(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_BIRTHDAYS, undefined, { token });
  }

  async searchClients(query: SearchClientsQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_SEARCH, query as Record<string, unknown>, { token });
  }

  async getPortfolio(userID: string, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_PORTFOLIO(userID), undefined, { token });
  }

  async addNote(userID: string, dto: AddClientNoteDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_NOTES(userID), dto, { token });
  }

  async getTromYeutzPortfolio(userID: string, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_TROM_PORTFOLIO(userID), undefined, { token });
  }

  async checkMislakaPrerequisites(userID: string, accountId: string, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_CHECK_MISLAKA_PREREQUISITES(userID, accountId), undefined, {
      token,
    });
  }

  async createMislakaRequest(
    userID: string,
    accountId: string,
    dto: CreateMislakaRequestDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_CREATE_MISLAKA_REQUEST(userID, accountId), dto, { token });
  }

  async getLatestMislakaRequestFiles(userID: string, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_LATEST_MISLAKA_FILES(userID), undefined, { token });
  }

  async createMislakaB1Request(
    userID: string,
    accountId: string,
    dto: CreateMislakaB1RequestDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_CREATE_MISLAKA_B1(userID, accountId), dto, { token });
  }

  async createTromYeutzClient(dto: CreateTromYeutzClientDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_CREATE_TROM, dto, { token });
  }

  async createActiveClient(dto: CreateActiveClientDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_CREATE_ACTIVE, dto, { token });
  }

  async convertTromToActive(userID: string, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.CLIENTS_CONVERT_TROM_TO_ACTIVE(userID), {}, { token });
  }

  async assignAgent(dto: AssignAgentDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_ASSIGN_AGENT, dto, { token });
  }

  async assignGoremMetapel(userID: string, dto: AssignGoremMetapelDto, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.CLIENTS_GOREM_METAPEL(userID), dto, { token });
  }

  async updateActiveClientDetails(
    userID: string,
    dto: UpdateActiveClientDetailsDto,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_UPDATE_DETAILS(userID), dto, { token });
  }

  async changeActiveClientType(userID: string, dto: ChangeClientTypeDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_CHANGE_CLIENT_TYPE(userID), dto, { token });
  }

  async updateTromYeutzDetails(userID: string, dto: UpdateTromYeutzDetailsDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_UPDATE_TROM_DETAILS(userID), dto, { token });
  }

  async setIdIssueDate(userID: string, dto: SetIdIssueDateDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_SET_ID_ISSUE_DATE(userID), dto, { token });
  }

  async assignEmployer(dto: AssignEmployerDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.CLIENTS_ASSIGN_EMPLOYER, dto, { token });
  }

  async getClientsByEmployer(employerId: string, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.CLIENTS_BY_EMPLOYER(employerId), undefined, { token });
  }

  async uploadTromYeutzFile(
    userID: string,
    dto: UploadClientFileMetadataDto,
    file?: Express.Multer.File,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(
      ROETO_ENDPOINTS.CLIENTS_UPLOAD_FILE_TROM(userID),
      { ...dto, fileName: file?.originalname },
      { token },
    );
  }

  async uploadActiveClientFile(
    userID: string,
    dto: UploadClientFileMetadataDto,
    file?: Express.Multer.File,
    token?: string,
  ): Promise<unknown> {
    return this.roetoClient.post(
      ROETO_ENDPOINTS.CLIENTS_UPLOAD_FILE_ACTIVE(userID),
      { ...dto, fileName: file?.originalname },
      { token },
    );
  }
}
