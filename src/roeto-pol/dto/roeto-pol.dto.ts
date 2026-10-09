import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestFormSignatureDto {
  @IsString()
  @IsNotEmpty()
  roetoPolAccountId!: string;

  @IsBoolean()
  attachmentA!: boolean;

  @IsBoolean()
  attachmentB!: boolean;

  @IsBoolean()
  attachmentH!: boolean;

  @IsBoolean()
  followUpHarBituach!: boolean;

  @IsString()
  followUpMislaka!: string;

  @IsString()
  @IsOptional()
  mislakaAuthCode?: string;
}

export class RequestHarBituachDto {
  @IsString()
  @IsNotEmpty()
  roetoPolAccountId!: string;
}
