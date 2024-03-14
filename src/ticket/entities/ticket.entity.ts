import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { nullable: false })
  userId: number;

  @Column('int', { nullable: false })
  scheduleId: number;

  @ManyToOne((type) => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne((type) => Schedule, { onDelete: 'CASCADE' })
  schedule: Schedule;
}
