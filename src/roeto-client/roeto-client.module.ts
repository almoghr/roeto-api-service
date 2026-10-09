import { Global, Module } from '@nestjs/common';
import { RoetoClientService } from './roeto-client.service';

@Global()
@Module({
  providers: [RoetoClientService],
  exports: [RoetoClientService],
})
export class RoetoClientModule {}
