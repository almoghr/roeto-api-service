import { Test, TestingModule } from '@nestjs/testing';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;
  const mockClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: RoetoClientService,
          useValue: mockClient,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should get birthdays', async () => {
    mockClient.get.mockResolvedValueOnce([{ firstName: 'דוד' }]);
    const res = await service.getBirthdays();
    expect(res).toEqual([{ firstName: 'דוד' }]);
  });

  it('should create trom-yeutz client', async () => {
    mockClient.post.mockResolvedValueOnce({ success: true, id: '123' });
    const res = await service.createTromYeutzClient({
      personalID: '123456789',
      firstName: 'יוסף',
      lastName: 'כהן',
      gender: '1',
      birthDay: '15-05-1980',
    });
    expect(res).toEqual({ success: true, id: '123' });
  });

  it('should convert trom to active client', async () => {
    mockClient.put.mockResolvedValueOnce({ success: true });
    const res = await service.convertTromToActive('123456789');
    expect(res).toEqual({ success: true });
  });
});
