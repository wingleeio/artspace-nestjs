import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UserModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { Work } from '../works/works.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Work]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
