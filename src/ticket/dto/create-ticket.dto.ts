import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: '공연회차 Id를 입력해주세요.' })
  @IsNumber()
  scheduleId: number;
}
