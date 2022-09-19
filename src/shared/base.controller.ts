import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from 'src/guard/jwtAuthentication.guard';

interface DEFAULT_OPERATIONS {
  find?: boolean,
  findOne?: boolean,
  update?: boolean,
  create?: boolean,
  delete?: boolean
}

@Controller('')

export class BaseController {

  protected _service: any;
  protected _defaultOperations: DEFAULT_OPERATIONS;

  constructor(service: any, defaultOperations?: DEFAULT_OPERATIONS) {
    this._service = service;
    if (!defaultOperations) {
      this._defaultOperations = { find: false, findOne: false, update: false, create: false, delete: false };
    }
    else {
      this._defaultOperations = defaultOperations;
    }
  }

  @Get('')
  async find() {
    if (!this._defaultOperations.find)
      return { status: 'DEFAULT OPERATIONS NOT AVAILABLE' };

    return this._service.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id) {
    if (!this._defaultOperations.findOne)
      return { status: 'DEFAULT OPERATIONS NOT AVAILABLE' };

    return this._service.findOne({ id: id });
  }

  @Post('/create')
  async create(@Body() payload: any) {
    if (!this._defaultOperations.create)
      return { status: 'DEFAULT OPERATIONS NOT AVAILABLE' };

    return this._service.create(payload);
  }

  @Put('/update/:id')
  async update(@Param('id') id, @Body() payload) {
    if (!this._defaultOperations.update)
      return { status: 'DEFAULT OPERATIONS NOT AVAILABLE' };

    return this._service.update(id, payload);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id) {
    if (!this._defaultOperations.delete)
      return { status: 'DEFAULT OPERATIONS NOT AVAILABLE' };

    return this._service.delete(id);
  }

}