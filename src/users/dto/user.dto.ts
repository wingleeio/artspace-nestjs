export class UserDTO {
  readonly id: number;
  readonly joined: Date;
  readonly username: string;
  readonly email: string;
  readonly avatar: string;
  readonly cover: string;
  readonly followersCount: number;
  readonly followingCount: number;
  readonly worksCount: number;
  followers?: any;
  works?: any;
  categories?: any;
  comments?: any;
}
