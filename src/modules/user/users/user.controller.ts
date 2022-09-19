import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/guard/jwtAuthentication.guard';
import { BaseController } from '../../../shared/base.controller';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthenticationGuard)
export class UserController extends BaseController {

  constructor(@Inject(UserService) protected readonly _userService: UserService) {

    super(_userService, { find: true, findOne: true, create: true, update: true, delete: true });
  }

  @Post('/findAll')
  async findAll(@Body() payload: any) {

    return this._userService.findAll(payload)
  }
  
  

}