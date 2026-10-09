export const HEBREW_TRANSLATIONS: Record<string, string> = {
  // General Statuses & Telemetry
  'OK': 'הפעולה בוצעה בהצלחה',
  'Success': 'הפעולה בוצעה בהצלחה',
  'Created': 'נוצר בהצלחה',
  'Updated': 'עודכן בהצלחה',
  'Deleted': 'נמחק בהצלחה',
  'Internal server error': 'שגיאת שרת פנימית',
  'Unauthorized': 'אין הרשאה מתאימה לביצוע הפעולה',
  'Forbidden': 'גישה נדחתה',
  'Not Found': 'המשאב המבוקש לא נמצא',
  'Bad Request': 'בקשה לא תקינה',
  'Rate limit exceeded': 'חריגה ממגבלת הבקשות המותרת',
  'The system is operational': 'המערכת פועלת כסדרה',

  // Authentication & OAuth
  'Invalid client credentials': 'פרטי ההזדהות של הלקוח אינם תקינים',
  'Token is valid': 'טוקן האימות בתוקף ותקין',
  'Token is invalid or expired': 'טוקן האימות אינו תקין או שפג תוקפו',
  'Failed to obtain access token': 'נכשל תהליך קבלת טוקן הגישה מ-Roeto',

  // Agency & Agents
  'Agents list retrieved successfully': 'רשימת הסוכנים המשווקים נטענה בהצלחה',
  'Agency users list retrieved successfully': 'רשימת משתמשי הסוכנות נטענה בהצלחה',
  'Client types retrieved successfully': 'סיווגי הלקוח נטענו בהצלחה',
  'Clients by agent retrieved successfully': 'לקוחות הסוכן נטענו בהצלחה',
  'Client existence check completed': 'בדיקת קיום לקוח בסוכנות הושלמה',
  'Client already exists': 'הלקוח כבר קיים בסוכנות',
  'Client does not exist': 'הלקוח אינו קיים במערכת',

  // Agent Dashboard
  'Agent dashboard retrieved successfully': 'נתוני דשבורד הסוכן נטענו בהצלחה',

  // Clients & Portfolio
  'Owner birthdays retrieved successfully': 'ימי הולדת של מבוטחים נטענו בהצלחה',
  'Clients search completed': 'חיפוש הלקוחות הושלם בהצלחה',
  'Client portfolio retrieved successfully': 'תיק הלקוח המלא נטען בהצלחה',
  'Note added to client successfully': 'ההערה נוספה ליומן הלקוח בהצלחה',
  'Trom-yeutz portfolio retrieved successfully': 'תיק טרום ייעוץ נטען בהצלחה',
  'Trom-yeutz client created successfully': 'לקוח טרום ייעוץ נוצר בהצלחה',
  'Active client created successfully': 'לקוח פעיל נוצר בהצלחה',
  'Client converted from trom-yeutz to active': 'הלקוח הומר בהצלחה מטרום ייעוץ ללקוח פעיל',
  'Agent assigned to client successfully': 'סוכן משווק שויך ללקוח בהצלחה',
  'Case handler assigned successfully': 'גורם מטפל שויך ללקוח בהצלחה',
  'Client details updated successfully': 'פרטי הלקוח עודכנו בהצלחה',
  'Client type updated successfully': 'סיווג הלקוח עודכן בהצלחה',
  'ID issue date updated successfully': 'תאריך הנפקת תעודת הזהות עודכן בהצלחה',
  'Employer assigned to client successfully': 'מעסיק שויך ללקוח בהצלחה',
  'Clients by employer retrieved successfully': 'רשימת לקוחות המעסיק נטענה בהצלחה',
  'File uploaded successfully': 'הקובץ הועלה בהצלחה לתיק הלקוח',

  // Mislaka & POA
  'Mislaka prerequisites verified': 'דרישות קדם למסלקה נבדקו בהצלחה',
  'Mislaka request submitted successfully': 'בקשת מסלקה נשלחה בהצלחה',
  'Latest mislaka files retrieved successfully': 'קישורי הורדת קבצי המסלקה הופקו בהצלחה',
  'Mislaka B1 POA request submitted successfully': 'בקשת ייפוי כוח ב-1 נשלחה למסלקה בהצלחה',
  'Mislaka connection retrieved successfully': 'חשבונות חיבור למסלקה נטענו בהצלחה',
  'Mislaka companies list retrieved successfully': 'רשימת חברות המסלקה נטענה בהצלחה',

  // Roeto-Pol & Har-Bituach
  'Roeto-Pol accounts retrieved successfully': 'חשבונות Roeto-Pol נטענו בהצלחה',
  'Digital form signature requested successfully': 'בקשת חתימה דיגיטלית נשלחה ללקוח בהצלחה',
  'Har-Bituach inquiry submitted successfully': 'שאילתת הר הביטוח נשלחה בהצלחה',

  // Cellosign Webhooks
  'Cellosign form signature processed successfully': 'מסמך חתום מ-Cellosign נקלט ועודכן בהצלחה',
  'Cellosign session expiration logged successfully': 'פג תוקף תהליך החתימה מ-Cellosign נקלט בהצלחה',

  // Employers
  'Employers search completed': 'חיפוש מעסיקים הושלם בהצלחה',

  // Leads
  'Campaigns retrieved successfully': 'קמפיינים פעילים נטענו בהצלחה',
  'Lead created successfully': 'הליד נקלט בהצלחה',
  'Lead updated successfully': 'פרטי הליד עודכנו בהצלחה',
  'Leads search completed': 'חיפוש לידים הושלם בהצלחה',
  'Leads imported from CSV successfully': 'קובץ הלידים יובא בהצלחה',

  // Sales Management / Financial Activities
  'Financial activity resources retrieved successfully': 'משאבי ניהול מכירות נטענו בהצלחה',
  'Financial activities search completed': 'חיפוש פעילויות פיננסיות הושלם בהצלחה',
  'Financial activities fetched successfully': 'פעילויות פיננסיות נטענו בהצלחה',
  'Financial activity created successfully': 'פעילות פיננסית נוצרה בהצלחה',
  'Financial activity updated successfully': 'פעילות פיננסית עודכנה בהצלחה',
  'Financial activity status updated successfully': 'סטטוס פעילות פיננסית עודכן בהצלחה',
  'Financial activity linked with task successfully': 'פעילות פיננסית קושרה למשימה בהצלחה',

  // Tasks
  'Tasks retrieved successfully': 'משימות נטענו בהצלחה',
  'Task created successfully': 'משימה נוצרה בהצלחה',
  'Task resources retrieved successfully': 'משאבי משימות נטענו בהצלחה',
  'Task completion toggled successfully': 'סטטוס השלמת המשימה עודכן בהצלחה',
  'Task description updated successfully': 'תיאור המשימה עודכן בהצלחה',
  'Task action added successfully': 'פעולה נוספה למשימה בהצלחה',
  'Task due date updated successfully': 'תאריך יעד למשימה עודכן בהצלחה',
  'Task reminder toggled successfully': 'התראת תזכורת למשימה עודכנה בהצלחה',
  'Tasks reassigned successfully': 'משימות הוקצו מחדש בהצלחה',
};

export function translateToHebrew(text?: unknown, statusCode?: number | string): string {
  if (text === null || text === undefined) {
    if (statusCode === 200 || statusCode === 201 || statusCode === 0) {
      return 'הפעולה בוצעה בהצלחה';
    }
    return 'שגיאה לא מזוהה';
  }

  const str = String(text).trim();

  if (HEBREW_TRANSLATIONS[str]) {
    return HEBREW_TRANSLATIONS[str];
  }

  // Common validation pattern checks
  if (
    str.includes('must') ||
    str.includes('should') ||
    str.includes('is required') ||
    str.includes('less than') ||
    str.includes('greater than') ||
    str.includes('each value')
  ) {
    return `שגיאת אימות נתונים: ${str}`;
  }

  if (statusCode === 401) return 'אין הרשאה מתאימה לבצע פעולה זו';
  if (statusCode === 403) return 'הגישה לפעולה זו נדחתה';
  if (statusCode === 404) return 'המשאב המבוקש לא נמצא במערכת';
  if (statusCode === 429) return 'חריגה ממגבלת הבקשות המותרת (Rate Limit)';
  if (statusCode === 500) return 'שגיאת שרת פנימית בתקשורת עם Roeto';

  return str;
}
