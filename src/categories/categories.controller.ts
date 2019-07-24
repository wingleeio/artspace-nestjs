import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  @UseGuards(AuthGuard())
  create(@Req() req, @Body() category) {
    return this.categoriesService.create(req.user, category);
  }
}
