import Role from 'src/enums/Roles';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Shop } from '../shops/shop.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @Column({ type: 'varchar', length: 120 })
  public is_active: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  public role: Role

  @OneToMany(() => Shop, (shop:Shop) => shop.users)
  public shop: Shop[]

  @CreateDateColumn({ type: 'timestamp' })
  public created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updated_at!: Date;
}