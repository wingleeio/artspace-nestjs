import { Module } from '@nestjs/common';
import { WorksController } from './works.controller';
import { WorksService } from './works.service';
import { Work } from './works.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Work]), UserModule],
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
