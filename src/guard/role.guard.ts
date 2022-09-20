import Role from '../enums/Roles';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../modules/authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../guard/jwtAuthentication.guard';
 
const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      console.log(request)
      const user = request.user;
 
      return user?.role.includes(role);
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;