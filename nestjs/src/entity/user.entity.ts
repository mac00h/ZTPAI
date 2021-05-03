import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable:false, length:255 })
    email: string;

    @Column({ nullable:false, length:255 })
    password: string;
}