import { Body, Controller, Get, Headers, Param, Post, Put, Query } from '@nestjs/common';
import {
  AddTaskActionDto,
  CreateTaskDto,
  GetTasksQueryDto,
  ReassignTasksDto,
  UpdateTaskDescriptionDto,
  UpdateTaskDueDateDto,
} from './dto/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query() query: GetTasksQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.getTasks(query, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post()
  async createTask(
    @Body() dto: CreateTaskDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.createTask(dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('resources')
  async getResources(@Headers('authorization') auth?: string): Promise<unknown> {
    return this.tasksService.getResources(auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put(':taskId/toggle-complete')
  async toggleComplete(
    @Param('taskId') taskId: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.toggleComplete(taskId, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put(':taskId/description')
  async updateDescription(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDescriptionDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.updateDescription(taskId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put(':taskId/action')
  async addAction(
    @Param('taskId') taskId: string,
    @Body() dto: AddTaskActionDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.addAction(taskId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put(':taskId/due-date')
  async updateDueDate(
    @Param('taskId') taskId: string,
    @Body() dto: UpdateTaskDueDateDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.updateDueDate(taskId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Put(':taskId/toggle-reminder')
  async toggleReminder(
    @Param('taskId') taskId: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.toggleReminder(taskId, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Get('by-user/:userId')
  async getTasksByUser(
    @Param('userId') userId: string,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.getTasksByUser(userId, auth?.replace(/^Bearer\s+/i, ''));
  }

  @Post('reassign-tasks/:userId')
  async reassignTasks(
    @Param('userId') userId: string,
    @Body() dto: ReassignTasksDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.tasksService.reassignTasks(userId, dto, auth?.replace(/^Bearer\s+/i, ''));
  }
}
