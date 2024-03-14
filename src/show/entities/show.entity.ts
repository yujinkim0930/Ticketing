import { Ticket } from 'src/ticket/entities/ticket.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowCategory } from '../types/show-category.type';
import { Schedule } from './schedule.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showName: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showInfo: string;

  @Column({ type: 'enum', enum: ShowCategory })
  showCategory: ShowCategory;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showPlace: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  price: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showImg: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udatedAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.show, { cascade: true })
  schedules: Schedule[];
}
