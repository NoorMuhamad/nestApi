import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { AuthenticationController } from './authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy'
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../user/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),UserModule, PassportModule, ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: '123456',
        signOptions: {
          expiresIn: '20h',
        },
      })
    })],
  providers: [AuthenticationService, UserService, LocalStrategy, JwtStrategy,],
  controllers: [AuthenticationController]
})
export class AuthenticationModule { }