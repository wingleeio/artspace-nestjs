import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  RelationCount,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
import { Work } from '../works/works.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  joined: Date;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(type => Work, work => work.author)
  works: Promise<Work[]>;

  @ManyToMany(type => Work)
  @JoinTable()
  favourites: Promise<Work[]>;

  @ManyToMany(type => User, user => user.following, { cascade: true })
  @JoinTable()
  followers: Promise<User[]>;

  @ManyToMany(type => User, user => user.followers)
  following: Promise<User[]>;

  @RelationCount((user: User) => user.followers)
  followersCount: number;

  @RelationCount((user: User) => user.following)
  followingCount: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(passwordToCompare: string): Promise<boolean> {
    return await bcrypt.compare(passwordToCompare, this.password);
  }

  async responseObject(
    showFollowers: boolean = true,
    showFollowersPage: number = 1,
    showFollowersPaginated: boolean = true,
  ) {
    const {
      id,
      joined,
      username,
      email,
      avatar,
      followersCount,
      followingCount,
    } = this;
    const responseObject: UserDTO = {
      id,
      joined,
      username,
      email,
      avatar,
      followersCount,
      followingCount,
    };

    if (this.followers && showFollowers === true) {
      responseObject.followers = await this.getFollowers(
        showFollowersPage,
        showFollowersPaginated,
      );
    }

    return responseObject;
  }

  async getFollowers(page: number = 1, paginated: boolean = true) {
    const followers = await this.followers;
    const followersPerPage = 15;

    if (paginated) {
      return await Promise.all(
        followers
          .slice(followersPerPage * (page - 1), followersPerPage * page)
          .map(follower => follower.responseObject(false)),
      );
    } else {
      return await Promise.all(
        followers.map(follower => follower.responseObject(false)),
      );
    }
  }
}
