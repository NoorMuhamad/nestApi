import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from '../users/user.entity';
@Entity('shops')
export class Shop {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public type: string;

  @Column({ type: 'varchar', length: 120 })
  public address: string;

  @Column()
  public usersId: number;

  @ManyToOne(() => User, (user:User) => user.shop)
  public users: User

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;
}