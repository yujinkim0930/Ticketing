import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from 'src/user/entities/user.entity';
import { Seat } from 'src/show/entities/seat.entity';
import { Schedule } from 'src/show/entities/schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async createTicket(userId: number, { scheduleId }: CreateTicketDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //공연 회차 정보 조회
      const schedule = await queryRunner.manager.findOne(Schedule, {
        where: { id: scheduleId },
        relations: {
          show: true,
        },
      });
      if (!schedule) {
        throw new NotFoundException({ message: '공연 회차 정보가 없습니다.' });
      }
      //예매 내역 생성
      const ticket = await queryRunner.manager.save(Ticket, {
        userId,
        scheduleId,
      });

      // 포인트 차감 -> show 가격 정보

      const price = schedule.show.price;
      const user = await queryRunner.manager.findOneBy(User, { id: userId });

      const afterFaidPoints = user.point - price;
      if (afterFaidPoints < 0) {
        throw new BadRequestException({ message: '포인트가 부족합니다.' });
      }
      user.point = afterFaidPoints;
      await queryRunner.manager.save(User, user);

      // 좌석 개수 줄이기
      const seat = await queryRunner.manager.findOneBy(Seat, { scheduleId });
      const afterTicketSeat = seat.availableSeats - 1;
      if (afterTicketSeat < 0) {
        throw new BadRequestException({
          message: '예매 가능한 좌석이 없습니다.',
        });
      }
      seat.availableSeats = afterTicketSeat;
      await queryRunner.manager.save(Seat, seat);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return ticket;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      console.error(err);
      throw err;
    }
  }

  async findAll(userId: number) {
    const tickets = await this.ticketRepository.find({
      where: { userId },
      relations: {
        schedule: {
          show: true,
        },
      },
    });
    return tickets;
  }

  async findOne(id: number, userId) {
    const ticket = await this.ticketRepository.findOne({
      where: { id, userId },
      relations: {
        schedule: {
          show: true,
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException({ message: '예매 정보를 찾을 수 없습니다.' });
    }
    return ticket;
  }
}
