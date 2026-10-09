import { expect, test } from '@playwright/test';

test.describe('Roeto B2B Service API Endpoints', () => {
  test('GET /api/v1/health should return ok and service metadata with Hebrew', async ({ request }) => {
    const response = await request.get('/api/v1/health');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('ok');
    expect(body.service).toBe('roeto-api-service');
    expect(body.message_he).toBe('המערכת פועלת כסדרה');
  });

  test('POST /api/v1/clients/create-trom-yeutz-client should validate request body and return Hebrew message', async ({
    request,
  }) => {
    const response = await request.post('/api/v1/clients/create-trom-yeutz-client', {
      data: {},
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message_he).toBeDefined();
    expect(typeof body.message_he).toBe('string');
  });

  test('GET /api/v1/agent/dashboard should validate threshold parameter', async ({ request }) => {
    const response = await request.get('/api/v1/agent/dashboard?chisachonDiffThreshold=100');
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message_he).toContain('שגיאת אימות נתונים');
  });

  test('POST /api/v1/tasks should reject missing title with 400 and return Hebrew', async ({ request }) => {
    const response = await request.post('/api/v1/tasks', {
      data: {
        description: 'Missing title',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message_he).toBeDefined();
  });
});
