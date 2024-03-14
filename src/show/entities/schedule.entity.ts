import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './show.entity';
import { Seat } from './seat.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  showId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udatedAt: Date;

  @ManyToOne(() => Show, (show) => show.schedules, { onDelete: 'CASCADE' })
  show: Show;

  @OneToOne(() => Seat, (seat) => seat.schedule, { cascade: true })
  seat: Seat;
}
