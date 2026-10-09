import { Module } from '@nestjs/common';
import { MislakaController } from './mislaka.controller';
import { MislakaService } from './mislaka.service';

@Module({
  controllers: [MislakaController],
  providers: [MislakaService],
  exports: [MislakaService],
})
export class MislakaModule {}
