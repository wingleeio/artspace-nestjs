import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  RelationCount,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { WorkDTO } from './dto/create-work.dto';
import { Category } from '../categories/categories.entity';
import { Comment } from '../comments/comments.entity';

@Entity()
export class Work extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  published: Date;

  @ManyToOne(type => User, user => user.works)
  author: Promise<User>;

  @Column({ length: 256 })
  title: string;

  @Column({ length: 2560 })
  description: string;

  @Column()
  imageUrl: string;

  @ManyToMany(type => Category, category => category.works)
  categories: Category;

  @ManyToMany(type => User, user => user.favourites)
  @JoinTable()
  favouritedBy: Promise<User[]>;

  @OneToMany(type => Comment, comment => comment.work, { cascade: true })
  @JoinTable()
  comments: Promise<Comment[]>;

  @RelationCount((work: Work) => work.favouritedBy)
  favouriteCount: number;

  @RelationCount((work: Work) => work.comments)
  commentCount: number;

  async responseObject() {
    const {
      id,
      published,
      title,
      description,
      imageUrl,
      favouriteCount,
      commentCount,
    } = this;

    const responseObject: WorkDTO = {
      id,
      published,
      title,
      description,
      imageUrl,
      favouriteCount,
      commentCount,
    };

    if (this.author) {
      const author = await this.author;
      responseObject.author = await author.responseObject(false);
    }

    if (this.comments) {
      const comments = await this.comments;
      responseObject.comments = await Promise.all(
        comments.map(comment => comment.responseObject()),
      );
    }

    if (this.favouritedBy) {
      const favouritedBy = await this.favouritedBy;
      responseObject.favouritedBy = await Promise.all(
        favouritedBy.map(user => user.responseObject(false)),
      );
    }

    return responseObject;
  }
}
