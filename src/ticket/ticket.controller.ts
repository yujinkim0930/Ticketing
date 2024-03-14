import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TicketService } from './ticket.service';

@UseGuards(AuthGuard('jwt'))
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
}
