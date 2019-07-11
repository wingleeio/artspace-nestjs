import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDTO } from './dto/user.dto';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64, unique: true })
  username: string;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ length: 128 })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(passwordToCompare: string): Promise<boolean> {
    return await bcrypt.compare(passwordToCompare, this.password);
  }

  responseObject(showToken: boolean = false) {
    const { id, username, email, token } = this;
    const responseObject: UserDTO = {
      id,
      username,
      email,
    };

    if (showToken) {
      responseObject.token = token;
    }

    return responseObject;
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
  }
}
