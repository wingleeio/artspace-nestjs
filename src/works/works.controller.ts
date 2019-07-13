import { Controller, Get, UseGuards, Post, Body, Req } from '@nestjs/common';
import { WorksService } from './works.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('works')
export class WorksController {
  constructor(private readonly workService: WorksService) {}

  @Get()
  findAll() {
    return this.workService.findAll();
  }

  @Post('create')
  @UseGuards(AuthGuard())
  createWork(@Req() req, @Body() work) {
    return this.workService.create(req.user, work);
  }
}
