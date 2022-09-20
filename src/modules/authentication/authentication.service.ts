import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/users/user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from "@nestjs/config";
import PostgresErrorCode from "src/enums/PostgresErrorCode";
import { User } from "../user/users/user.entity";

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  /**
   * @description
   * @param registrationData User
   * @returns :Promise<User>
   */
  public async register(registrationData: any): Promise<any> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      console.log("createdUsera" ,registrationData);
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword
      });
      createdUser.password = undefined;
      console.log("createdUser" ,createdUser);
      
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @description
   * @param email string
   * @param plainTextPassword string
   * @returns 
   */
  public async getAuthenticatedUser(email: string, plainTextPassword: string): Promise<User> {

    try {
      const user = await this.userService.findOne(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;

      return user;
    } catch (error) {
      throw new HttpException('Wrong email credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description
   * @param plainTextPassword string
   * @param hashedPassword string
   * @returns Promise<void>
   */
  private async verifyPassword(plainTextPassword: string, hashedPassword: string) :Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    if (!isPasswordMatching) {
      throw new HttpException('Wrong password credentials  provided', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description
   * @param userId number
   * @returns String
   */
  public getJwtToken(userId: number): String {
    const payload = { userId };
    const token = this.jwtService.sign(payload);

    return token;
  }

}