import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { API_CONSTANTS } from '../src/common/constants/api.constants';
import { RoetoClientService } from '../src/roeto-client/roeto-client.service';

describe('Roeto B2B Service (e2e)', () => {
  let app: INestApplication;
  const mockRoetoClientService = {
    get: jest.fn().mockImplementation((path: string) => {
      if (path === '/agency/client-types') {
        return Promise.resolve(['לקוח זהב', 'לקוח כסף']);
      }
      return Promise.resolve({
        success: true,
        message: 'Mock GET success',
      });
    }),
    post: jest.fn().mockImplementation((path: string) => {
      return Promise.resolve({
        success: true,
        message: `Mock POST success for ${path}`,
      });
    }),
    put: jest.fn().mockImplementation((path: string) => {
      return Promise.resolve({
        success: true,
        message: `Mock PUT success for ${path}`,
      });
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RoetoClientService)
      .useValue(mockRoetoClientService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix(API_CONSTANTS.GLOBAL_PREFIX);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/health (GET) should return healthy status with Hebrew translation', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
        expect(res.body.service).toBe('roeto-api-service');
        expect(res.body.message_he).toBe('המערכת פועלת כסדרה');
      });
  });

  it('/api/v1/agency/client-types (GET) should return client types array', () => {
    return request(app.getHttpServer())
      .get('/api/v1/agency/client-types')
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body).toContain('לקוח זהב');
      });
  });

  it('/api/v1/clients/create-trom-yeutz-client (POST) should reject invalid payload with 400 and Hebrew translation', () => {
    return request(app.getHttpServer())
      .post('/api/v1/clients/create-trom-yeutz-client')
      .send({})
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message_he).toBeDefined();
        expect(typeof res.body.message_he).toBe('string');
      });
  });

  it('/api/v1/clients/create-trom-yeutz-client (POST) should accept valid client data', () => {
    return request(app.getHttpServer())
      .post('/api/v1/clients/create-trom-yeutz-client')
      .send({
        personalID: '123456789',
        firstName: 'יוסף',
        lastName: 'כהן',
        gender: '1',
        birthDay: '15-05-1980',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.message_he).toBeDefined();
      });
  });

  it('/api/v1/agent/dashboard (GET) should enforce minimum threshold validation', () => {
    return request(app.getHttpServer())
      .get('/api/v1/agent/dashboard?chisachonDiffThreshold=500')
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.message_he).toContain('שגיאת אימות נתונים');
      });
  });

  it('/api/v1/tasks (POST) should validate and create a task', () => {
    return request(app.getHttpServer())
      .post('/api/v1/tasks')
      .send({
        title: 'פגישת ייעוץ פנסיוני',
        description: 'הכנת דוח מסלקה',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.message_he).toBeDefined();
      });
  });
});
