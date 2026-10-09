import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class SignedDocumentDto {
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class CellosignSessionTemplateDto {
  @IsOptional()
  @IsString()
  id?: string;
}

export class CellosignSessionItemDto {
  @IsOptional()
  @IsObject()
  template?: CellosignSessionTemplateDto;
}

export class CellosignFormSignatureWebhookDto {
  @IsString()
  @IsNotEmpty()
  reference!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => SignedDocumentDto)
  signed_document!: SignedDocumentDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CellosignSessionItemDto)
  sessions!: CellosignSessionItemDto[];
}

export class CellosignExpiredSessionRefDto {
  @IsString()
  @IsNotEmpty()
  reference!: string;
}

export class CellosignSessionExpiredWebhookDto {
  @IsObject()
  @ValidateNested()
  @Type(() => CellosignExpiredSessionRefDto)
  session!: CellosignExpiredSessionRefDto;
}
