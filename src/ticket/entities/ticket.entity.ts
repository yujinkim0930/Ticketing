import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Show } from 'src/show/entities/show.entity';

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

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Show, (show) => show.tickets)
  @JoinColumn({ name: 'showId' })
  show: Show;
}
