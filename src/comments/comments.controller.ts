import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  Delete,
  Put,
  Body,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Post('create/:id')
  @UseGuards(AuthGuard())
  create(@Req() req: any, @Param('id') id: number) {
    return this.commentsService.create(req.user, req.body, id);
  }

  @Post('reply/:id')
  @UseGuards(AuthGuard())
  reply(@Req() req: any, @Param('id') id: number) {
    return this.commentsService.reply(req.user, req.body, id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard())
  delete(@Req() req: any, @Param('id') id: number) {
    return this.commentsService.delete(req.user, id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard())
  update(@Req() req, @Param('id') id, @Body() updatedComment) {
    return this.commentsService.update(req.user, id, updatedComment);
  }
}
