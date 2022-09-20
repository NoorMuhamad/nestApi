import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import Role from 'src/enums/Roles';
import JwtAuthenticationGuard from 'src/guard/jwtAuthentication.guard';
import RoleGuard from 'src/guard/role.guard';
import { BaseController } from '../../../shared/base.controller';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthenticationGuard)
@UseGuards(RoleGuard(Role.Admin))
export class UserController extends BaseController {

  constructor(@Inject(UserService) protected readonly _userService: UserService) {

    super(_userService, { find: true, findOne: true, create: true, update: true, delete: true });
  }  
  

}