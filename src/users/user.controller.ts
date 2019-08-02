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
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserLogin } from './interface/user-login.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('page/:page')
  findAllPaginated(@Param('page') page: number) {
    return this.userService.findAll(true, page);
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
    return this.userService.findAllUserFollowers(username, page);
  }

  @Get(':username/followers')
  findAllFollowers(@Param('username') username: string) {
    return this.userService.findAllUserFollowers(username, 0, false);
  }

  @Get(':username/works/:page')
  findAllWorksPaginated(
    @Param('username') username: string,
    @Param('page') page: number,
  ) {
    return this.userService.findAllUserWorks(username, page);
  }

  @Get(':username/works')
  findAllWorks(@Param('username') username: string) {
    return this.userService.findAllUserWorks(username, 0, false);
  }

  @Get(':username/comments/:page')
  findAllCommentsPaginated(
    @Param('username') username: string,
    @Param('page') page: number,
  ) {
    return this.userService.findAllUserComments(username, page);
  }

  @Get(':username/comments')
  findAllComments(@Param('username') username: string) {
    return this.userService.findAllUserComments(username, 0, false);
  }

  @Get(':username/categories')
  findAllCategories(@Param('username') username: string) {
    return this.userService.findAllUserCategories(username);
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

  @Put('update/:username')
  @UseGuards(AuthGuard())
  update(@Req() req, @Param('username') username, @Body() body) {
    return this.userService.update(req.user, username, body);
  }

  @Get('auth/token')
  @UseGuards(AuthGuard())
  authenticate(@Req() req) {
    return this.userService.authenticate(req.user);
  }

  @Get('/:username/favourites')
  findFavourites(@Param('username') username) {
    return this.userService.findFavourites(username, 0, false);
  }

  @Get('/:username/isfollowing')
  @UseGuards(AuthGuard())
  isFollowing(@Req() req, @Param('username') username) {
    return this.userService.isFollowing(req.user, username);
  }
}
