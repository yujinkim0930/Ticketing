import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  showName: string;

  @IsString()
  @IsNotEmpty({ message: '공연 정보를 입력해주세요.' })
  showInfo: string;

  @IsArray()
  @IsNotEmpty({ message: '공연 날짜와 시간을 입력해주세요.' })
  showDate: string[];

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  showPlace: string;

  @IsNumber()
  @IsNotEmpty({ message: '좌석 수를 입력해주세요.' })
  seat: number;

  @IsNumber()
  @IsNotEmpty({ message: '금액을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '공연 이미지를 입력해주세요.' })
  showImg: string;

  @IsString()
  @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
  showCategory: string;
}
