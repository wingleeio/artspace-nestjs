import { UserDTO } from '../../users/dto/user.dto';

export class CommentDTO {
  readonly id: number;
  readonly published: Date;
  author?: UserDTO;
  readonly content: string;
  comments?: any;
}
