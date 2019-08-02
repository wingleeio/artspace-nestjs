import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Req,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WorksService } from './works.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/works')
export class WorksController {
  constructor(private readonly workService: WorksService) {}

  @Get()
  findAll() {
    return this.workService.findAll();
  }

  @Get('following')
  @UseGuards(AuthGuard())
  findAllByFollowing(@Req() req) {
    return this.workService.findAllByFollowing(req.user);
  }

  @Get('following/:page')
  @UseGuards(AuthGuard())
  findAllByFollowingPaginated(@Req() req, @Param('page') page) {
    return this.workService.findAllByFollowingPaginated(req.user, page);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.workService.findOne(id);
  }

  @Get('page/:page')
  findAllPaginated(@Param('page') page: number) {
    return this.workService.findAll(true, page);
  }

  @Post('create')
  @UseGuards(AuthGuard())
  createWork(@Req() req, @Body() work) {
    return this.workService.create(req.user, work);
  }

  @Post('/likeunlike/:id')
  @UseGuards(AuthGuard())
  likeUnlike(@Req() req, @Param('id') id: number) {
    return this.workService.likeUnlike(req.user, id);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard())
  delete(@Req() req, @Param('id') id: number) {
    return this.workService.delete(req.user, id);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard())
  update(@Req() req, @Param('id') id, @Body() body) {
    return this.workService.update(req.user, id, body);
  }
}
