import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @Column({ type: 'json', unique: true, nullable: false })
  showDate: string[];

  @Column({ type: 'varchar', unique: true, nullable: false })
  showPlace: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  seat: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  price: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showImg: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  showCategory: string;

  @OneToMany(() => Ticket, (ticket) => ticket.show)
  tickets: Ticket[];
}
