import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ShowService } from './show.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/types/userRole.type';
import { CreateShowDto } from './dto/create-show.dto';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Get()
  async findAll() {
    return await this.showService.findAll();
  }

  @Roles(Role.Admin)
  @Post()
  async createShow(@Body() createShowDto: CreateShowDto) {
    return await this.showService.createShow(
      createShowDto.showName,
      createShowDto.showInfo,
      createShowDto.showDate,
      createShowDto.showPlace,
      createShowDto.seat,
      createShowDto.price,
      createShowDto.showImg,
      createShowDto.showCategory,
    );
  }

  @Post('search')
  async searchShow(@Body() keyword: string) {
    return await this.showService.searchShow(keyword);
  }

  @Get(':showId')
  async findOne(@Param('showId') id: number) {
    return await this.showService.findOne(id);
  }
}
