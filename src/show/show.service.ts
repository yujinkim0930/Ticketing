import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { JwtService } from '@nestjs/jwt';
import { Like, Repository } from 'typeorm';
import { CreateShowDto } from './dto/create-show.dto';
import { FindAllShowDto } from './dto/find-all-show.dto';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
  ) {}
  async findAll({ keyword, category }: FindAllShowDto) {
    const shows = await this.showRepository.find({
      where: {
        ...(keyword && { showName: Like(`%${keyword}%`) }),
        ...(category && { showCategory: category }),
      },
    });
    return shows;
  }
  async findOne(id: number) {
    const show = await this.showRepository.findOne({
      where: { id },
      relations: {
        schedules: {
          seat: true,
        },
      },
    });

    if (!show) {
      throw new NotFoundException({ message: '공연을 찾을 수 없습니다.' });
    }
    return show;
  }
  async createShow(createShowDto: CreateShowDto) {
    const { schedules, seats, ...restOfShow } = createShowDto;
    const existedShow = await this.showRepository.findOneBy({
      showName: createShowDto.showName,
    });

    if (existedShow) {
      throw new BadRequestException({
        message: '이미 사용 중인 공연명입니다.',
      });
    }
    return await this.showRepository.save({
      ...restOfShow,
      schedules: schedules.map((schedule) => {
        return {
          ...schedule,
          seat: {
            availableSeats: seats,
            totalSeats: seats,
          },
        };
      }),
    });
  }
}
