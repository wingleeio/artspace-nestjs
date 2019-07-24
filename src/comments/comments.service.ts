import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { User } from '../users/user.entity';
import { Work } from '../works/works.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRespository: Repository<Comment>,
    @InjectRepository(Work)
    private readonly WorkRespository: Repository<Work>,
  ) {}

  async findAll() {
    const comments = await this.CommentRespository.find();
    return await Promise.all(comments.map(comment => comment.responseObject()));
  }

  async create(user: User, newComment: any, id: number) {
    const work: Work = await this.WorkRespository.findOne({
      where: { id },
    });

    if (!work) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const comment = new Comment();

    comment.content = newComment.content;
    comment.author = Promise.resolve(user);
    comment.work = work;

    if (await comment.save()) {
      return comment.responseObject();
    }
  }

  async reply(user: User, newComment: any, id: number) {
    const parentComment: Comment = await this.CommentRespository.findOne({
      where: { id },
    });

    if (!parentComment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const comment = new Comment();

    comment.content = newComment.content;
    comment.author = Promise.resolve(user);
    comment.comment = parentComment;

    if (await comment.save()) {
      return comment.responseObject();
    }
  }

  async delete(user: User, id: number) {
    const comment: Comment = await this.CommentRespository.findOne({
      where: { id },
    });
    const author = await comment.author;

    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (author.id === user.id && comment) {
      await this.CommentRespository.delete(comment.id);
    }
  }

  async update(user: User, id: number, updatedComment) {
    const comment: Comment = await this.CommentRespository.findOne({
      where: { id },
    });
    const author = await comment.author;

    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (author.id === user.id && comment) {
      comment.content = updatedComment.content;
      return await comment.save();
    }
  }
}
