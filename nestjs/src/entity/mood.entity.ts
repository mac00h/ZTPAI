import { Column, ColumnTypeUndefinedError, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Mood {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date'})
    date: string;

    @Column({ nullable: false })
    forcast: string;

    @Column({ nullable: false })
    location: string;
}