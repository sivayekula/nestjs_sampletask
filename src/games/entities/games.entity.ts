import { IsNotEmpty } from "class-validator";
import { User } from "src/users/entities/users.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game  extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : number;
  
    @Column({ unique: true })
    title : string;
  
    @Column()
    platform : string;
    
    @Column({type:'double'})
    score : number;
  
    @Column()
    genre : string;
  
    @Column({length:1})
    editors_choice : string;
  
    @ManyToOne(type=>User, User=>User.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name : 'user_id'})
    @Column({type : 'int', nullable: false})
    user_id : number;

}