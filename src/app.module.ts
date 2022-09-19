import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getEnvPath } from './common/helper/env.helper';

import { UserModule } from './modules/user/user.module';
import {AuthenticationModule} from './modules/authentication/authentication.module'

import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';


const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthenticationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }