import { Controller, Get, Headers, Query } from '@nestjs/common';
import { SearchEmployersQueryDto } from './dto/employers.dto';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Get()
  async searchEmployers(
    @Query() query: SearchEmployersQueryDto,
    @Headers('authorization') auth?: string,
  ): Promise<unknown> {
    return this.employersService.searchEmployers(query, auth?.replace(/^Bearer\s+/i, ''));
  }
}
