import { Test, TestingModule } from '@nestjs/testing';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;
  const mockClient = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: RoetoClientService,
          useValue: mockClient,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should create task', async () => {
    mockClient.post.mockResolvedValueOnce({ success: true, id: 'task-1' });
    const res = await service.createTask({ title: 'פגישת ייעוץ' });
    expect(res).toEqual({ success: true, id: 'task-1' });
  });

  it('should toggle task complete', async () => {
    mockClient.put.mockResolvedValueOnce({ completed: true });
    const res = await service.toggleComplete('task-1');
    expect(res).toEqual({ completed: true });
  });
});
