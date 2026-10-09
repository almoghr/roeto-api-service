import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class AgentDashboardQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1000)
  chisachonDiffThreshold?: number = 40000;
}
