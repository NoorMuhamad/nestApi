import { Body, Controller, Inject, Post } from '@nestjs/common';
import { BaseController } from '../../../shared/base.controller';
import { UserService } from './user.service';

@Controller('users')
export class UserController extends BaseController {

  constructor(@Inject(UserService) protected readonly _userService: UserService) {

    super(_userService, { find: true, findOne: true, create: true, update: true, delete: true });
  }

  @Post('/findAll')
  async findAll(@Body() payload: any) {

    return this._userService.findAll(payload)
  }

}