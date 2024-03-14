import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
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

  @Column({ type: 'varchar', unique: true, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'int', default: 1000000 })
  point: number;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
