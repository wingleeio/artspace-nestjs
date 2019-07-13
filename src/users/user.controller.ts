import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLogin } from './interface/user-login.interface';
import { AuthGuard, PassportModule } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('page/:page')
  findAllPaginated(@Param('page') page: number) {
    return this.userService.findAll(page);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Get(':username/followers/:page')
  findAllFollowersPaginated(
    @Param('username') username: string,
    @Param('page') page: number,
  ) {
    return this.userService.findAllFollowers(username, page);
  }

  @Get(':username/followers')
  findAllFollowers(@Param('username') username: string) {
    return this.userService.findAllFollowers(username, 0, false);
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

  @Post('/hello')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    return req.user.responseObject();
  }

  @Post('follow/:user')
  @UseGuards(AuthGuard())
  follow(@Req() req, @Param() toFollow) {
    return this.userService.follow(req.user, toFollow.user);
  }
  @Post('unfollow/:user')
  @UseGuards(AuthGuard())
  unfollow(@Req() req, @Param() toUnfollow) {
    return this.userService.unfollow(req.user, toUnfollow.user);
  }
}
