import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../shared/base.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService {

  constructor(@InjectRepository(User) protected readonly _repo: Repository<User>) {
    super(_repo);
  }


  async findAll(payload: any): Promise<any> {
    const offSet = payload.skip * payload.limit
    const limit = payload.limit
    const sort = (payload.sort.direction == "desc" ? "DESC" : "ASC")
    const [items, count] = await this._repo.findAndCount({ order: { id: sort }, skip: offSet, take: limit });
    if (payload.search) {
      const items = await this._repo.findBy({ name: payload.search });
      return { items, count: 0 }
    }
    return { items, count }
  }
  
}