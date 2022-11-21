import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  favorites: string; // array not supported by sqlite3
}