import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 255 })
    firstName: string;
    
    @Column({ nullable: false, length: 255 })
    lastName: string;
}