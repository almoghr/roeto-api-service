import { Module } from '@nestjs/common';
import { RoetoPolController } from './roeto-pol.controller';
import { RoetoPolService } from './roeto-pol.service';

@Module({
  controllers: [RoetoPolController],
  providers: [RoetoPolService],
  exports: [RoetoPolService],
})
export class RoetoPolModule {}
