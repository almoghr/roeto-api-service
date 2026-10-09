import { Injectable } from '@nestjs/common';
import { ROETO_ENDPOINTS } from '../common/constants/api.constants';
import { RoetoClientService } from '../roeto-client/roeto-client.service';
import {
  AddTaskActionDto,
  CreateTaskDto,
  GetTasksQueryDto,
  ReassignTasksDto,
  UpdateTaskDescriptionDto,
  UpdateTaskDueDateDto,
} from './dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly roetoClient: RoetoClientService) {}

  async getTasks(query?: GetTasksQueryDto, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.TASKS, query as Record<string, unknown>, { token });
  }

  async createTask(dto: CreateTaskDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.TASKS, dto, { token });
  }

  async getResources(token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.TASKS_RESOURCES, undefined, { token });
  }

  async toggleComplete(taskId: string, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.TASKS_TOGGLE_COMPLETE(taskId), {}, { token });
  }

  async updateDescription(taskId: string, dto: UpdateTaskDescriptionDto, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.TASKS_DESCRIPTION(taskId), dto, { token });
  }

  async addAction(taskId: string, dto: AddTaskActionDto, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.TASKS_ACTION(taskId), dto, { token });
  }

  async updateDueDate(taskId: string, dto: UpdateTaskDueDateDto, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.TASKS_DUE_DATE(taskId), dto, { token });
  }

  async toggleReminder(taskId: string, token?: string): Promise<unknown> {
    return this.roetoClient.put(ROETO_ENDPOINTS.TASKS_TOGGLE_REMINDER(taskId), {}, { token });
  }

  async getTasksByUser(userId: string, token?: string): Promise<unknown> {
    return this.roetoClient.get(ROETO_ENDPOINTS.TASKS_BY_USER(userId), undefined, { token });
  }

  async reassignTasks(userId: string, dto: ReassignTasksDto, token?: string): Promise<unknown> {
    return this.roetoClient.post(ROETO_ENDPOINTS.TASKS_REASSIGN(userId), dto, { token });
  }
}
