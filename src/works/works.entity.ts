import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { WorkDTO } from './dto/create-work.dto';

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  published: Date;

  @ManyToOne(type => User, user => user.works, { eager: true })
  author: User;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 2560 })
  description: string;

  @Column()
  imageUrl: string;

  @ManyToMany(type => User)
  favouritedBy: Promise<User[]>;

  async responseObject() {
    const { id, published, title, description, imageUrl } = this;
    const responseObject: WorkDTO = {
      id,
      published,
      title,
      description,
      imageUrl,
    };

    if (this.author) {
      const author = await this.author;
      responseObject.author = await author.responseObject(false);
    }

    return responseObject;
  }
}
