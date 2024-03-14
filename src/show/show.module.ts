import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowController } from './show.controller';
import { Show } from './entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show])],
  providers: [ShowService],
  controllers: [ShowController],
})
export class ShowModule {}
