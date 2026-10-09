import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { RoetoApiException } from '../common/errors/roeto-api.exception';
import { RoetoClientService } from './roeto-client.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('RoetoClientService', () => {
  let service: RoetoClientService;
  const mockHttpInstance = {
    request: jest.fn(),
    post: jest.fn(),
  };

  beforeEach(async () => {
    mockedAxios.create.mockReturnValue(mockHttpInstance as unknown as typeof axios);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoetoClientService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue({
              baseUrl: 'https://api.roeto.co.il/api/v1',
              clientId: 'test-client',
              clientSecret: 'test-secret',
              timeoutMs: 5000,
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RoetoClientService>(RoetoClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute GET request successfully', async () => {
    mockHttpInstance.request.mockResolvedValueOnce({
      data: { success: true, count: 5 },
    });

    const result = await service.get<{ success: boolean; count: number }>('/agency/client-types', undefined, {
      token: 'jwt-123',
    });

    expect(result.success).toBe(true);
    expect(result.count).toBe(5);
    expect(mockHttpInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: 'https://api.roeto.co.il/api/v1/agency/client-types',
        headers: expect.objectContaining({
          Authorization: 'Bearer jwt-123',
        }),
      }),
    );
  });

  it('should execute POST request and throw RoetoApiException on 400 error', async () => {
    const errorResponse = {
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          message: 'Client already exists',
          error: 'DuplicateClient',
        },
      },
    };
    mockHttpInstance.request.mockRejectedValueOnce(errorResponse);

    await expect(
      service.post('/clients/create-trom-yeutz-client', { personalID: '123' }, { token: 'jwt-123' }),
    ).rejects.toThrow(RoetoApiException);
  });
});
