import { Test, TestingModule } from '@nestjs/testing';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { AgencyService } from './agency.service';

describe('AgencyService', () => {
  let service: AgencyService;
  const mockClient = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgencyService,
        {
          provide: RoetoClientService,
          useValue: mockClient,
        },
      ],
    }).compile();

    service = module.get<AgencyService>(AgencyService);
  });

  it('should get client types', async () => {
    mockClient.get.mockResolvedValueOnce(['לקוח זהב', 'לקוח כסף']);
    const result = await service.getClientTypes();
    expect(result).toEqual(['לקוח זהב', 'לקוח כסף']);
    expect(mockClient.get).toHaveBeenCalledWith('/agency/client-types', undefined, { token: undefined });
  });

  it('should check client existence', async () => {
    mockClient.get.mockResolvedValueOnce({ exists: true });
    const result = await service.checkClientExistence({ userID: '123456789' });
    expect(result).toEqual({ exists: true });
  });
});
