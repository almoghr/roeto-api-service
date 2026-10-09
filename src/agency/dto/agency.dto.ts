import { IsOptional, IsString } from 'class-validator';

export class ClientsByAgentQueryDto {
  @IsOptional()
  @IsString()
  clientType?: string;

  @IsOptional()
  @IsString()
  tromYeutz?: string;
}

export class CheckClientExistenceQueryDto {
  @IsOptional()
  @IsString()
  userID?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;
}
