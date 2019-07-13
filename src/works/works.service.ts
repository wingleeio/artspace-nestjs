import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './works.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { WorkDTO } from './dto/create-work.dto';

@Injectable()
export class WorksService {
  constructor(
    @InjectRepository(Work)
    private readonly WorkRepository: Repository<Work>,
  ) {}

  async findAll() {
    const works = await this.WorkRepository.find();
    return await Promise.all(works.map(work => work.responseObject()));
  }

  async create(user: User, newWork: WorkDTO) {
    const work = this.WorkRepository.create({
      author: user,
      title: newWork.title,
      description: newWork.description,
      imageUrl: newWork.imageUrl,
    });

    if (await work.save()) {
      return work.responseObject();
    }
  }
}
