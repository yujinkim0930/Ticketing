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

  @Column('int', { name: 'userId', nullable: false })
  userId: number;

  @Column('int', { name: 'showId', nullable: false })
  showId: number;

  @ManyToOne((type) => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne((type): typeof Schedule => Schedule, { onDelete: 'CASCADE' })
  schedule: Schedule;
}
