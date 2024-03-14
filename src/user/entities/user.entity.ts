import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../types/userRole.type';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Index('email', ['email'], { unique: true })
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  nickName: string;

  @Column({ type: 'varchar', unique: true, nullable: false, select: false })
  password: string;

  @Column({ type: 'int' })
  point: number;

  @Column({ default: Role.User })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  udatedAt: Date;

  @OneToMany((type) => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
