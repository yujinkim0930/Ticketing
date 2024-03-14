import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity({ name: 'seats' })
export class Seat {
  @PrimaryColumn()
  id: number;

  @Column()
  scheduleId: number;

  @Column()
  availableSeats: number;

  @Column()
  totalSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udatedAt: Date;

  @OneToOne(() => Schedule, (Schedule) => Schedule.seat)
  @JoinColumn()
  schedule: Schedule;
}
