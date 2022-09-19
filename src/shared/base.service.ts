import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BaseService {

  protected _repo: Repository<any>;

  constructor(repository: Repository<any>) {
    this._repo = repository;
  }

  findOne(where: any): Promise<any> {
    return this._repo.findOneBy(where);
  }

  find(): Promise<any> {
    return this._repo.find({});
  }

  create(fields: any): Promise<any> {
    return this._repo.save(fields);
  }

  update(id: number, fields: any): Promise<any> {
    return this._repo.update(id, fields);
  }

  delete(where: any): Promise<any> {
    return this._repo.delete({id:where});
  }

}