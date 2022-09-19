import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getEnvPath } from './common/helper/env.helper';

import { authModule } from './modules/auth/auth.module';

import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';


const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    authModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }