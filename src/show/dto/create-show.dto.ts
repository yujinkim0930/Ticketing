import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  ValidateNested,
} from 'class-validator';
import { ShowCategory } from '../types/show-category.type';
import { MAX_PRICE } from 'src/constants/point.constant';
import { CreateScheduleDto } from './create-schedule.dto';
import { Type } from 'class-transformer';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  showName: string;

  @IsString()
  @IsNotEmpty({ message: '공연 정보를 입력해주세요.' })
  showInfo: string;

  @IsEnum(ShowCategory)
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  showCategory: ShowCategory;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  showPlace: string;

  @IsNumber()
  @Max(MAX_PRICE, { message: '50,000포인트를 넘을 수 없습니다.' })
  @IsNotEmpty({ message: '금액을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  showImg: string;

  @ValidateNested()
  @Type(() => CreateScheduleDto)
  schedules: CreateScheduleDto[];

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seats: number;
}
