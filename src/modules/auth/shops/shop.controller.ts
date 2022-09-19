import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { BaseController } from '../../../shared/base.controller';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopsController extends BaseController {

  constructor(@Inject(ShopService) protected readonly _shopService: ShopService) {

    super(_shopService, { find: true, findOne: true, create: true, update: true, delete: true });
  }

  @Get('getAllShops')
  async getAllShops() {
    return this._shopService.getAllShops(1);
  }


}