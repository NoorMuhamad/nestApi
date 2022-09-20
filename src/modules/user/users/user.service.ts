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
  
}