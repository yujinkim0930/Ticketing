import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: ['showName', 'showDate', 'showPlace'],
    });
  }

  async findOne(id: number) {
    return await this.selectShowById(id);
  }

  async createShow(
    showName: string,
    showInfo: string,
    showDate: string[],
    showPlace: string,
    seat: number,
    price: number,
    showImg: string,
    showCategory: string,
  ) {
    await this.showRepository.save({
      showName,
      showInfo,
      showDate,
      showPlace,
      seat,
      price,
      showImg,
      showCategory,
    });
  }

  async searchShow(keyword: string): Promise<any[]> {
    const filteredShows = await this.searchShowsByKeyword(keyword);
    return filteredShows;
  }
  private async selectShowById(id: number) {
    const show = await this.showRepository.findOneBy({ id });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }
    return show;
  }

  private async searchShowsByKeyword(keyword: string): Promise<Show[]> {
    const query = this.showRepository.createQueryBuilder('show');

    // 키워드에 해당하는 show 필터링
    query.where('LOWER(show.title) LIKE :keyword', {
      keyword: `%${keyword.toLowerCase()}%`,
    });

    // 검색 결과 반환
    return query.getMany();
  }
}
