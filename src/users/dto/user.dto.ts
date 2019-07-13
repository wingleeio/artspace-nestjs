export class UserDTO {
  readonly id: number;
  readonly joined: Date;
  readonly username: string;
  readonly email: string;
  readonly avatar: string;
  readonly followersCount: number;
  readonly followingCount: number;
  followers?: any;
  token?: string;
}
