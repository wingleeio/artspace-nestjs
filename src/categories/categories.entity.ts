import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  BaseEntity,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Work } from '../works/works.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 512 })
  about: string;

  @ManyToOne(type => User, user => user.categories)
  author: User;

  @ManyToMany(type => Work, work => work.categories)
  works: Promise<Work[]>;

  async responseObject() {
    const { id, title, about } = this;
    const responseObject = {
      id,
      title,
      about,
    };

    return responseObject;
  }
}
