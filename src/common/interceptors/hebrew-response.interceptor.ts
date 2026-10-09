import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { translateToHebrew } from '../i18n/hebrew-translations.constants';

@Injectable()
export class HebrewResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (!data || typeof data !== 'object') {
          return data;
        }

        return this.enrichWithHebrew(data as Record<string, unknown>);
      }),
    );
  }

  private enrichWithHebrew(obj: Record<string, unknown>): Record<string, unknown> {
    if (Array.isArray(obj)) {
      return obj as unknown as Record<string, unknown>;
    }

    const enriched: Record<string, unknown> = { ...obj };

    if (enriched.message) {
      enriched.message_he = translateToHebrew(enriched.message);
    } else if (enriched.success !== undefined) {
      enriched.message_he = translateToHebrew(enriched.success ? 'Success' : 'Failed');
    } else if (!enriched.message_he) {
      enriched.message_he = translateToHebrew('OK');
    }

    return enriched;
  }
}
