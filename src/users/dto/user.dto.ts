export class UserDTO {
  readonly id: number;
  readonly joined: Date;
  readonly username: string;
  readonly email: string;
  readonly avatar: string;
  readonly cover: string;
  readonly bio: string;
  readonly followersCount: number;
  readonly followingCount: number;
  readonly worksCount: number;
  favourites?: any;
  followers?: any;
  works?: any;
  categories?: any;
  comments?: any;
}
