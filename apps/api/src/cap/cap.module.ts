import { Module } from '@nestjs/common';
import { CapController } from './cap.controller';
import { CapService } from './cap.service';

@Module({
  controllers: [CapController],
  providers: [CapService],
})
export class CapModule {}
