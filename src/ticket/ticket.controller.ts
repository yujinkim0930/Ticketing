import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TicketService } from './ticket.service';
import { Role } from 'src/user/types/userRole.type';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @Post()
  async createTicket(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    const userId = req.user.id;
    return await this.ticketService.createTicket(userId, createTicketDto);
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    return await this.ticketService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: number) {
    const userId = req.user.id;
    return await this.ticketService.findOne(id, userId);
  }
}
