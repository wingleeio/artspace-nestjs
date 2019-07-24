import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly CategoryRepository: Repository<Category>,
  ) {}

  async create(user: User, newCategory) {
    const category = this.CategoryRepository.create({
      author: user,
      title: newCategory.title,
      about: newCategory.about,
    });

    if (await category.save()) {
      return category.responseObject();
    }
  }
}
