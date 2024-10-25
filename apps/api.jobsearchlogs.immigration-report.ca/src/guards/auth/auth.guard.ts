import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService, UserDbService } from '../../services';
import { User } from '@prisma/client';
import { isItErrorType } from '../../utils/typesValidator';
import { isExpired } from '../../utils/time';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userDbService: UserDbService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = await this.validateRequest(request); // Attach user object to request
    return true;
  }
  async validateRequest(request: any): Promise<User> {
    const authorization = request.headers.authorization;
    const token = authorization.replace('Bearer ', '').trim();
    console.log('validateRequest', token);

    this.userDbService.initiateConnection();
    const user = await this.userDbService.findFirst(token, true, false);
    await this.userDbService.disconnect();
    if (user === null) {
      throw new NotFoundException('Incorrect token.');
    }
    if (isItErrorType(user)) {
      throw new InternalServerErrorException(
        user['message'] || 'Error while finding user',
      );
    }
    const { auth_token_expiry } = user as User;
    if (isExpired(Number(auth_token_expiry))) {
      throw new ForbiddenException('token expired.');
    }
    // Add your authentication logic here
    return user as User; // example: check if a user is present
  }
}
