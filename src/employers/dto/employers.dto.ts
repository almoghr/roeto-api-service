import { IsOptional, IsString } from 'class-validator';

export class SearchEmployersQueryDto {
  @IsOptional()
  @IsString()
  shemMaasik?: string;

  @IsOptional()
  @IsString()
  misparMaasik?: string;

  @IsOptional()
  @IsString()
  _id?: string;
}
