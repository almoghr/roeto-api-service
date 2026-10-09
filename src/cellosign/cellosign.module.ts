import { Module } from '@nestjs/common';
import { CellosignController } from './cellosign.controller';
import { CellosignService } from './cellosign.service';

@Module({
  controllers: [CellosignController],
  providers: [CellosignService],
  exports: [CellosignService],
})
export class CellosignModule {}
