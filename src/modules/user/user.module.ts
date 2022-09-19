import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './users/user.entity';
import { Shop } from './shops/shop.entity';

import { UserController } from './users/user.controller';
import { ShopsController } from './shops/shop.controller';

import { UserService } from './users/user.service';
import { ShopService } from './shops/shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Shop])],
  controllers: [UserController, ShopsController],
  providers: [UserService, ShopService]
})

export class UserModule { }