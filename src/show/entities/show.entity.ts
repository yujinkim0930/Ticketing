import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShowCategory } from '../types/show-category.type';
import { Schedule } from './schedule.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showName: string;

  @Column({ type: 'varchar', nullable: false })
  showInfo: string;

  @Column({ type: 'enum', enum: ShowCategory })
  showCategory: ShowCategory;

  @Column({ type: 'varchar', nullable: false })
  showPlace: string;

  @Column({ type: 'varchar', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: false })
  showImg: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udatedAt: Date;

  @OneToMany(() => Schedule, (schedule) => schedule.show, { cascade: true })
  schedules: Schedule[];
}
