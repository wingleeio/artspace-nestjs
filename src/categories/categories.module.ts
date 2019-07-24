import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UserModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), UserModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
