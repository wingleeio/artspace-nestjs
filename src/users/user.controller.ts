import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLogin } from './interface/user-login.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() user: CreateUserDTO) {
    return this.userService.register(user);
  }

  @Post('login')
  login(@Body() login: UserLogin) {
    return this.userService.login(login);
  }
}
