import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchClientsQueryDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  userID?: string;

  @IsOptional()
  @IsString()
  clientType?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  beforeSeniority?: string;

  @IsOptional()
  @IsString()
  afterSeniority?: string;
}

export class AddClientNoteDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsString()
  logType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  recipients?: string[];
}

export class CreateMislakaRequestDto {
  @IsOptional()
  @IsString()
  authCode?: string;

  @IsOptional()
  @IsBoolean()
  noAuthCode?: boolean;
}

export class CreateMislakaB1RequestDto {
  @IsString()
  @IsNotEmpty()
  signatureDate!: string;

  @IsString()
  @IsIn(['infoOnly', 'goref'])
  previousAgentCancellationMode!: string;

  @IsBoolean()
  mortgageValidity!: boolean;

  @IsNumber()
  company!: number;

  @IsString()
  @IsNotEmpty()
  agentNumber!: string;
}

export class CreateTromYeutzClientDto {
  @IsString()
  @IsNotEmpty()
  personalID!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsIn(['1', '2'])
  gender!: string;

  @IsString()
  @IsNotEmpty()
  birthDay!: string;

  @IsOptional()
  @IsString()
  primaryPhone?: string;

  @IsOptional()
  @IsString()
  idIssueDate?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  homeNum?: string;

  @IsOptional()
  @IsString()
  aptNum?: string;

  @IsOptional()
  @IsString()
  meshavekItemId?: string;
}

export class CreateActiveClientDto {
  @IsString()
  @IsNotEmpty()
  personalID!: string;

  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsIn(['1', '2'])
  gender!: string;

  @IsString()
  @IsNotEmpty()
  birthDay!: string;

  @IsString()
  @IsNotEmpty()
  primaryPhone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  homeNum?: string;

  @IsOptional()
  @IsString()
  aptNum?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  meshavekItemId?: string;

  @IsOptional()
  @IsString()
  goremMetapelUserId?: string;

  @IsOptional()
  @IsString()
  employerId?: string;

  @IsOptional()
  @IsString()
  clientType?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class AssignAgentDto {
  @IsString()
  @IsNotEmpty()
  ownerId!: string;

  @IsString()
  @IsNotEmpty()
  selectedAgent!: string;
}

export class AssignGoremMetapelDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;
}

export class UpdateActiveClientDetailsDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsIn(['1', '2'])
  gender?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  birthDay?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  homeNum?: string;

  @IsOptional()
  @IsString()
  aptNum?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}

export class ChangeClientTypeDto {
  @IsString()
  @IsNotEmpty()
  clientType!: string;
}

export class UpdateTromYeutzDetailsDto extends UpdateActiveClientDetailsDto {
  @IsOptional()
  @IsString()
  idIssueDate?: string;
}

export class SetIdIssueDateDto {
  @IsString()
  @IsNotEmpty()
  idIssueDate!: string;
}

export class AssignEmployerDto {
  @IsString()
  @IsNotEmpty()
  ownerId!: string;

  @IsString()
  @IsNotEmpty()
  employerId!: string;
}

export class UploadClientFileMetadataDto {
  @IsString()
  @IsNotEmpty()
  displayName!: string;

  @IsString()
  @IsNotEmpty()
  folderName!: string;
}
