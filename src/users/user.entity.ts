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
import { Category } from '../categories/categories.entity';
import { Comment } from '../comments/comments.entity';

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

  @Column({ nullable: true })
  cover: string;

  @Column({ default: '' })
  bio: string;

  @OneToMany(type => Work, work => work.author)
  works: Promise<Work[]>;

  @OneToMany(type => Category, category => category.author)
  categories: Promise<Category[]>;

  @ManyToMany(type => Work)
  favourites: Promise<Work[]>;

  @OneToMany(type => Comment, comment => comment.author)
  comments: Promise<Comment[]>;

  @ManyToMany(type => User, user => user.following)
  @JoinTable()
  followers: Promise<User[]>;

  @ManyToMany(type => User, user => user.followers)
  following: Promise<User[]>;

  @RelationCount((user: User) => user.followers)
  followersCount: number;

  @RelationCount((user: User) => user.following)
  followingCount: number;

  @RelationCount((user: User) => user.works)
  worksCount: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(passwordToCompare: string): Promise<boolean> {
    return await bcrypt.compare(passwordToCompare, this.password);
  }

  async responseObject(
    showRelations: boolean = true,
    showRelationsPage: number = 1,
    showRelationsPaginated: boolean = true,
  ) {
    const {
      id,
      joined,
      username,
      email,
      avatar,
      cover,
      followersCount,
      followingCount,
      worksCount,
      categories,
    } = this;
    const responseObject: UserDTO = {
      id,
      joined,
      username,
      email,
      avatar,
      cover,
      followersCount,
      followingCount,
      worksCount,
    };

    if (this.followers && showRelations === true) {
      responseObject.followers = await this.getFollowers(
        showRelationsPage,
        showRelationsPaginated,
      );
    }

    if (this.works && showRelations === true) {
      responseObject.works = await this.getWorks(
        showRelationsPage,
        showRelationsPaginated,
      );
    }

    if (this.comments && showRelations === true) {
      responseObject.comments = await this.getComments(
        showRelationsPage,
        showRelationsPaginated,
      );
    }

    if (categories && showRelations === true) {
      responseObject.categories = await categories;
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

  async getWorks(page: number = 1, paginated: boolean = true) {
    const works = await this.works;
    const worksPerPage = 15;

    if (paginated) {
      return await Promise.all(
        works
          .slice(worksPerPage * (page - 1), worksPerPage * page)
          .map(work => work.responseObject()),
      );
    } else {
      return await Promise.all(works.map(work => work.responseObject()));
    }
  }

  async getComments(page: number = 1, paginated: boolean = true) {
    const comments = await this.comments;
    const commentsPerPage = 15;

    if (paginated) {
      return await Promise.all(
        comments
          .slice(commentsPerPage * (page - 1), commentsPerPage * page)
          .map(work => work.responseObject()),
      );
    } else {
      return await Promise.all(
        comments.map(comment => comment.responseObject(false)),
      );
    }
  }
}
