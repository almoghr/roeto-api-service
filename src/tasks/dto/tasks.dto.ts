import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetTasksQueryDto {
  @IsOptional()
  @IsString()
  owner?: string;

  @IsOptional()
  @IsString()
  taskTitle?: string;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  employerId?: string;

  @IsOptional()
  @IsString()
  assignedUser?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsBoolean()
  sendReminder?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class UpdateTaskDescriptionDto {
  @IsString()
  @IsNotEmpty()
  description!: string;
}

export class AddTaskActionDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsString()
  actionType?: string;
}

export class UpdateTaskDueDateDto {
  @IsString()
  @IsNotEmpty()
  dueDate!: string;
}

export class ReassignTasksDto {
  @IsArray()
  @IsString({ each: true })
  taskIds!: string[];
}
