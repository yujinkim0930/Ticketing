import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { CreateShowDto } from './dto/create-show.dto';
import { FindAllShowDto } from './dto/find-all-show.dto';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async findAll(@Query() findAllShowDto: FindAllShowDto) {
    return await this.showService.findAll(findAllShowDto);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async createShow(@Body() createShowDto: CreateShowDto) {
    return await this.showService.createShow(createShowDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.showService.findOne(id);
  }
}
