import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BaseService {

  protected _repo: Repository<any>;

  constructor(repository: Repository<any>) {
    this._repo = repository;
  }

  findOne(where: any): Promise<any> {    
    return this._repo.findOneBy({email:where});
  }

  findOneById(where: any): Promise<any> {
    return this._repo.findOneBy({id:where});
  }

  find(): Promise<any> {
    return this._repo.find({});
  }

  async create(fields: any): Promise<any> {
    try {
      const data = await this._repo.save(fields);
      return data  
    } catch (error) {
      console.log(error)
    }
    
  }

  update(id: number, fields: any): Promise<any> {
    return this._repo.update(id, fields);
  }

  delete(where: any): Promise<any> {
    return this._repo.delete({id:where});
  }

}