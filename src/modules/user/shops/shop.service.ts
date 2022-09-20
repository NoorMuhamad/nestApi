import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../shared/base.service';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService extends BaseService {

  constructor(@InjectRepository(Shop) protected readonly _repo: Repository<Shop>) {
    super(_repo);
  }

  /**
   * @description
   * @param id Number
   * @returns 
   */
  getAllShops(id:number): Promise<Shop> {
    return this._repo.findOne({
      where: {
        usersId:id,
      },
      relations: ['users'],
    });
  }
}