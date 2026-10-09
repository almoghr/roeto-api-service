import { HttpException, HttpStatus } from '@nestjs/common';
import { translateToHebrew } from '../i18n/hebrew-translations.constants';

export interface RoetoErrorDetails {
  statusCode: number;
  message: string;
  operation?: string;
  error?: string;
  errors?: unknown[];
  rawResponse?: unknown;
}

export class RoetoApiException extends HttpException {
  public readonly roetoStatusCode: number;
  public readonly roetoMessage: string;
  public readonly messageHe: string;
  public readonly operation?: string;
  public readonly errorType?: string;
  public readonly errors?: unknown[];
  public readonly rawResponse?: unknown;

  constructor(details: RoetoErrorDetails, httpStatus: HttpStatus = HttpStatus.BAD_REQUEST) {
    const messageHe = translateToHebrew(details.message, details.statusCode);
    super(
      {
        success: false,
        statusCode: details.statusCode,
        message: details.message,
        message_he: messageHe,
        error: details.error,
        operation: details.operation,
        errors: details.errors,
      },
      httpStatus,
    );
    this.roetoStatusCode = details.statusCode;
    this.roetoMessage = details.message;
    this.messageHe = messageHe;
    this.operation = details.operation;
    this.errorType = details.error;
    this.errors = details.errors;
    this.rawResponse = details.rawResponse;
  }
}
