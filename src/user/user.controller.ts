import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() loginDto: SignupDto) {
    return await this.userService.signup(loginDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async findMe(@Request() req) {
    const userId = req.user.id;

    const data = await this.userService.findOneById(userId);

    return data;
  }
}
