import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './interface/user-input.interface';
import { UserLogin } from './interface/user-login.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.UserRepository.find();
    return users.map(user => user.responseObject());
  }

  async findOne(id: number) {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (user) {
      return await user.responseObject();
    }
  }

  async findByUsername(username: string) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      return await user.responseObject();
    }
  }

  async findByEmail(email: string) {
    const user = await this.UserRepository.findOne({ where: { email } });
    if (user) {
      return await user.responseObject();
    }
  }

  async register(newUser: UserInput) {
    // Check if username or email already exists.
    if (!(await this.findByUsername(newUser.username))) {
      if (!(await this.findByEmail(newUser.email))) {
        // Create a new User.
        const user = this.UserRepository.create(newUser);
        // Save user if no errors.
        if (await this.UserRepository.save(user)) {
          return user.responseObject(true);
        }
      } else {
        this.throwHttpException('Email already exists');
      }
    } else {
      // Check if email also exists.
      if (await this.findByEmail(newUser.email)) {
        this.throwHttpException('Username and Email already exists');
      }
      this.throwHttpException('Username already exists');
    }
  }

  async login(auth: UserLogin) {
    const { login, password } = auth;
    let user;

    if (this.isValidEmail(login)) {
      user = await this.UserRepository.findOne({ where: { email: login } });
    } else {
      user = await this.UserRepository.findOne({ where: { username: login } });
    }

    if (!user || !(await user.comparePassword(password))) {
      this.throwHttpException('Invalid login or password.');
    }

    return user.responseObject(true);
  }

  isValidEmail(email: string) {
    if (email) {
      // tslint:disable-next-line: max-line-length
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else {
      return false;
    }
  }
  // Error handling

  throwHttpException(msg: string) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: msg,
      },
      403,
    );
  }
}
