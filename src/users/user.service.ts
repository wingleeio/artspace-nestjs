import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './interface/user-input.interface';
import { UserLogin } from './interface/user-login.interface';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findAll(paginated: boolean = false, page: number = 1) {
    if (page < 1) {
      page = 1;
    }

    let options;

    if (paginated) {
      options = {
        take: 15,
        skip: 15 * (page - 1),
      };
    }

    const users = await this.UserRepository.find(options);

    return await Promise.all(
      users.map(user => {
        return user.responseObject(false);
      }),
    );
  }

  async findOne(id: number) {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (user) {
      return await user.responseObject(false);
    }
  }

  async findByUsername(username: string) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      return await user.responseObject(false);
    }
  }

  async findByEmail(email: string) {
    const user = await this.UserRepository.findOne({ where: { email } });
    if (user) {
      return await user.responseObject(false);
    }
  }

  async findAllUserFollowers(
    username: string,
    page: number,
    paginated: boolean = true,
  ) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      const userResponseObject = await user.responseObject(
        true,
        page,
        paginated,
      );
      const followers = userResponseObject.followers;
      return followers;
    }
  }

  async findAllUserWorks(
    username: string,
    page: number,
    paginated: boolean = true,
  ) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      const userResponseObject = await user.responseObject(
        true,
        page,
        paginated,
      );
      const works = userResponseObject.works;
      return works.sort((a, b) => b.id - a.id);
    }
  }

  async findAllUserComments(
    username: string,
    page: number,
    paginated: boolean = true,
  ) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      const userResponseObject = await user.responseObject(
        true,
        page,
        paginated,
      );
      const comments = userResponseObject.comments;
      return comments;
    }
  }

  async findAllUserCategories(username: string) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      const userResponseObject = await user.responseObject(true);
      const categories = userResponseObject.categories;
      return categories;
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
          const payload = { username: user.username };
          return { token: await this.jwtService.sign(payload) };
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

    const payload = { username: user.username };
    return { token: await this.jwtService.sign(payload) };
  }

  async authenticate(user: User) {
    return await user.responseObject(false);
  }

  async follow(user: User, toFollow: string) {
    const userToFollow = await this.UserRepository.findOne({
      where: { username: toFollow },
    });
    const followers = await userToFollow.followers;

    if (user.id === userToFollow.id) {
      const msg = {
        message: `Cannot follow yourself.`,
      };
      return msg;
    }

    if (!followers.find(follower => follower.id === user.id)) {
      userToFollow.followers = Promise.resolve([...followers, user]);
    }

    if (await userToFollow.save()) {
      const msg = {
        message: `Followed ${userToFollow.username}.`,
      };
      return msg;
    }
  }

  async unfollow(user: User, toUnfollow: string) {
    const userToUnfollow = await this.UserRepository.findOne({
      where: { username: toUnfollow },
    });
    const followers = await userToUnfollow.followers;

    userToUnfollow.followers = Promise.resolve([
      ...followers.filter(follower => follower.id !== user.id),
    ]);

    if (await userToUnfollow.save()) {
      const msg = {
        message: `Unfollowed ${userToUnfollow.username}.`,
      };
      return msg;
    }
  }

  async update(user: User, username: string, updatedUserInfo: any) {
    const userToUpdate = await this.UserRepository.findOne({
      where: { username },
    });

    if (!userToUpdate) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    if (user.id === userToUpdate.id) {
      userToUpdate.avatar = updatedUserInfo.avatar;
      userToUpdate.cover = updatedUserInfo.cover;
      userToUpdate.bio = updatedUserInfo.bio;
      const userUpdated = await userToUpdate.save();
      return userUpdated.responseObject(false);
    }
  }

  async findFavourites(
    username: string,
    page: number,
    paginated: boolean = true,
  ) {
    const user = await this.UserRepository.findOne({ where: { username } });
    if (user) {
      const userResponseObject = await user.responseObject(
        true,
        page,
        paginated,
      );
      const favourites = userResponseObject.favourites;

      return favourites.sort((a, b) => b.id - a.id);
    }
  }

  async isFollowing(user: User, username: string) {
    const userToCheck = await this.UserRepository.findOne({
      where: { username },
    });

    const followers = await userToCheck.followers;

    const isFollower = followers.find(follower => user.id === follower.id);

    if (isFollower) {
      return true;
    } else {
      return false;
    }
  }

  // async findFavourites(username: string) {
  //   const user = await this.UserRepository.findOne({
  //     where: { username },
  //   });

  //   const favourites = await user.favourites;

  //   return await Promise.all(
  //     favourites.map(favourite => favourite.responseObject()),
  //   );
  // }

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
