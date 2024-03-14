import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Schedule])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
