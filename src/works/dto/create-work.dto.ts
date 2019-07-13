import { UserDTO } from '../../users/dto/user.dto';

export class WorkDTO {
  readonly id: number;
  readonly published?: Date;
  author?: UserDTO;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  favouritedBy?: any;
}
