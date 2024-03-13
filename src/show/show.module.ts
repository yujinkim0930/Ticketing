import { Module } from '@nestjs/common';
import { ShowService } from './show.service';

@Module({
  providers: [ShowService]
})
export class ShowModule {}
