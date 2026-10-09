import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchFinancialActivitiesQueryDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  activityType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  saleTitle?: string;

  @IsOptional()
  @IsString()
  assignedUser?: string;

  @IsOptional()
  @IsString()
  sochenMeshavek?: string;
}

export class FetchFinancialActivitiesQueryDto {
  @IsOptional()
  @IsString()
  ownerID?: string;

  @IsOptional()
  @IsString()
  sochenID?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  activityType?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  createdDateAfter?: string;

  @IsOptional()
  @IsString()
  createdDateBefore?: string;

  @IsOptional()
  @IsString()
  executionDateAfter?: string;

  @IsOptional()
  @IsString()
  executionDateBefore?: string;

  @IsOptional()
  @IsString()
  cancellationDateAfter?: string;

  @IsOptional()
  @IsString()
  cancellationDateBefore?: string;
}

export class CreateFinancialActivityDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  activityType!: string;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsOptional()
  @IsString()
  saleTitle?: string;

  @IsString()
  @IsNotEmpty()
  meshavekItemId!: string;

  @IsString()
  @IsNotEmpty()
  assignedUser!: string;

  @IsString()
  @IsIn(['existing', 'new', 'minuiSochen'])
  activityClientType!: string;

  @IsOptional()
  @IsString()
  executionDate?: string;

  @IsOptional()
  @IsString()
  hafakaDate?: string;

  @IsOptional()
  @IsString()
  bitulDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  genSchumPremiaZafui?: number;

  @IsOptional()
  @IsNumber()
  schumPremiaBaFoal?: number;

  @IsOptional()
  @IsNumber()
  genSchumBituachHaim?: number;

  @IsOptional()
  @IsString()
  taarichTchilatBituach?: string;

  @IsOptional()
  @IsNumber()
  genSchumHaavaraZafui?: number;

  @IsOptional()
  @IsNumber()
  schumHaavaraBaFoal?: number;
}

export class UpdateFinancialActivityDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  saleTitle?: string;

  @IsOptional()
  @IsNumber()
  genSchumHaavaraZafui?: number;

  @IsOptional()
  @IsNumber()
  genSchumPremiaZafui?: number;

  @IsOptional()
  @IsNumber()
  schumHaavaraBaFoal?: number;

  @IsOptional()
  @IsNumber()
  schumPremiaBaFoal?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  executionDate?: string;

  @IsOptional()
  @IsString()
  hafakaDate?: string;

  @IsOptional()
  @IsString()
  bitulDate?: string;
}

export class ChangeFinancialActivityStatusDto {
  @IsString()
  @IsNotEmpty()
  status!: string;
}
