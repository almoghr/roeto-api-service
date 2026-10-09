import { translateToHebrew } from './hebrew-translations.constants';

describe('Hebrew Translations', () => {
  it('should translate exact matches correctly', () => {
    expect(translateToHebrew('OK')).toBe('הפעולה בוצעה בהצלחה');
    expect(translateToHebrew('Invalid client credentials')).toBe('פרטי ההזדהות של הלקוח אינם תקינים');
    expect(translateToHebrew('Rate limit exceeded')).toBe('חריגה ממגבלת הבקשות המותרת');
  });

  it('should translate validation errors with prefix', () => {
    const res = translateToHebrew('personalID must be a string');
    expect(res).toContain('שגיאת אימות נתונים');
  });

  it('should handle HTTP status codes fallback', () => {
    expect(translateToHebrew('custom error', 404)).toBe('המשאב המבוקש לא נמצא במערכת');
    expect(translateToHebrew('rate limit', 429)).toBe('חריגה ממגבלת הבקשות המותרת (Rate Limit)');
  });
});
