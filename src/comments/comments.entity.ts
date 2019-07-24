import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Work } from '../works/works.entity';
import { CommentDTO } from './dto/comment.dto';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  published: Date;

  @ManyToOne(type => User, user => user.comments, { eager: true })
  author: Promise<User>;

  @ManyToOne(type => Work, work => work.comments, { onDelete: 'CASCADE' })
  work: Work;

  @ManyToOne(type => Comment, comment => comment.comments, {
    onDelete: 'CASCADE',
  })
  comment: Comment;

  @OneToMany(type => Comment, comment => comment.comment)
  comments: Promise<Comment[]>;

  async responseObject(showAuthor: boolean = true) {
    const { id, content, published } = this;
    const responseObject: CommentDTO = {
      id,
      published,
      content,
    };

    if (this.author && showAuthor) {
      const author = await this.author;
      responseObject.author = await author.responseObject(false);
    }

    if (this.comments) {
      const comments = await this.comments;
      responseObject.comments = await Promise.all(
        comments.map(comment => comment.responseObject()),
      );
    }

    return responseObject;
  }
}
