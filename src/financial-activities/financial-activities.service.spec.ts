import { Test, TestingModule } from '@nestjs/testing';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { FinancialActivitiesService } from './financial-activities.service';

describe('FinancialActivitiesService', () => {
  let service: FinancialActivitiesService;
  const mockClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinancialActivitiesService,
        {
          provide: RoetoClientService,
          useValue: mockClient,
        },
      ],
    }).compile();

    service = module.get<FinancialActivitiesService>(FinancialActivitiesService);
  });

  it('should get resources', async () => {
    mockClient.get.mockResolvedValueOnce({ companies: ['הראל'] });
    const res = await service.getResources();
    expect(res).toEqual({ companies: ['הראל'] });
  });

  it('should update status', async () => {
    mockClient.put.mockResolvedValueOnce({ success: true });
    const res = await service.changeStatus('fa-1', { status: 'הושלם' });
    expect(res).toEqual({ success: true });
  });
});
