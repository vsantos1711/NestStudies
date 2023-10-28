import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Tag[];
}
