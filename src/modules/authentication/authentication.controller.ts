import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Header } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from '../../guard/localAuthentication.guard';
 
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}

  @Post('register')
  async register(@Body() registrationData) {

    return this.authenticationService.register(registrationData);
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    console.log(request.user)
    const {user} = request;    
    const token = this.authenticationService.getJwtToken(user.id);
    user.password = undefined;
    return token
  }
}