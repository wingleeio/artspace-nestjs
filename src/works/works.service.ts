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

  async findAll(paginated: boolean = false, page: number = 1) {
    if (page < 1) {
      page = 1;
    }

    let options;

    if (paginated) {
      options = {
        take: 25,
        skip: 25 * (page - 1),
        order: {
          published: 'DESC',
        },
      };
    }

    const [works, count] = await this.WorkRepository.findAndCount(options);

    return {
      works: await Promise.all(works.map(work => work.responseObject())),
      count,
    };
  }

  async findOne(id) {
    const work = await this.WorkRepository.findOne({ where: { id } });
    return await work.responseObject();
  }

  async create(user: User, newWork: WorkDTO) {
    const work = new Work();

    // this.WorkRepository.create({
    //   author: Promise.resolve(user),
    //   title: newWork.title,
    //   description: newWork.description,
    //   imageUrl: newWork.imageUrl,
    // });

    work.author = Promise.resolve(user);
    work.title = newWork.title;
    work.description = newWork.description;
    work.imageUrl = newWork.imageUrl;

    if (await work.save()) {
      return work.responseObject();
    }
  }

  async likeUnlike(user: User, id: number) {
    const work = await this.WorkRepository.findOne({ where: { id } });
    const favouritedBy = await work.favouritedBy;

    if (favouritedBy.find(f => f.id === user.id)) {
      work.favouritedBy = Promise.resolve([
        ...favouritedBy.filter(f => f.id !== user.id),
      ]);
    } else {
      work.favouritedBy = Promise.resolve([...favouritedBy, user]);
    }
    await work.save();
  }

  async delete(user: User, id: number) {
    const work = await this.WorkRepository.findOne({ where: { id } });
    const author = await work.author;
    if (user.id === author.id && work) {
      await this.WorkRepository.delete(id);
    }
  }

  async update(user: User, id: number, updatedWork) {
    const workToUpdate = await this.WorkRepository.findOne({ where: { id } });
    const author = await workToUpdate.author;
    if (user.id === author.id && workToUpdate) {
      workToUpdate.title = updatedWork.title;
      workToUpdate.description = updatedWork.description;
      const newWork = await workToUpdate.save();
      return await newWork.responseObject();
    }
  }
}
