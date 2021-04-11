import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as crypto from 'crypto';

@Entity()
export class User  extends BaseEntity{
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  name : string;

  @Column()
  email : string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column()
  password : string;

  @Column({default : true})
  is_active : boolean;
}