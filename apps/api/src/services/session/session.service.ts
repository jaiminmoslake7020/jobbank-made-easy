import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ErrorType, SessionBodyDto } from '../../types';
import {
  AccessTokenResponseType,
  AuthService,
  ProfileResponseType,
  RefreshTokenResponseType,
} from '../google';
import { UserDbService } from '../db';
import { Prisma } from '.prisma/client';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { isItErrorType } from '../../utils/typesValidator';

@Injectable()
export class SessionService {
  constructor(
    private readonly authService: AuthService,
    private readonly userDbService: UserDbService,
  ) {}
  getTimeInSecond(expires_in: number): number {
    const currentDate = new Date();
    currentDate.setSeconds(expires_in - 50);
    return parseInt(String(currentDate.getTime() / 1000));
  }
  async getJwt(email: string, name: string) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      email: email,
      name: name,
    };
    const secret = 'your_secret_key';
    return jwt.sign(payload, secret, {
      header,
      expiresIn: 60 * 60,
    });
  }
  async refreshToken(user: User): Promise<any> {
    const { refresh_google_login_token, id } = user;
    const refreshToken = await this.authService.getNewAccessTokenData(
      refresh_google_login_token,
    );
    if (
      refreshToken &&
      Object.hasOwnProperty.call(refreshToken, 'message') &&
      refreshToken['message']
    ) {
      throw new InternalServerErrorException(
        'Refresh Token failed. 2' + (refreshToken as ErrorType).message,
      );
    }
    const { access_token, expires_in } =
      refreshToken as AccessTokenResponseType;
    const timeInMilliseconds = this.getTimeInSecond(expires_in);
    const { name, email } = user as ProfileResponseType;
    const accessToken = await this.getJwt(email, name);
    const userRecordFind = {
      google_login_token: access_token,
      google_login_token_expiry: timeInMilliseconds,
      auth_token_expiry: timeInMilliseconds,
      auth_token: accessToken,
    } as Prisma.UserUncheckedCreateInput;
    this.userDbService.initiateConnection();
    const newUser = await this.userDbService.update(
      userRecordFind,
      id,
      true,
      true,
    );
    if (isItErrorType(newUser) || !newUser) {
      throw new InternalServerErrorException(
        'User update failed.' + (newUser as ErrorType).message,
      );
    }
    await this.userDbService.disconnect();
    const t = Number((newUser as User).auth_token_expiry);
    return {
      name,
      email,
      accessToken,
      accessTokenExpiry: t,
    };
  }
  async process(session: SessionBodyDto): Promise<any> {
    const { code } = session;
    console.log('session', session);
    const AccessTokenData =
      await this.authService.getAccessTokenDataWithRefreshToken(code);
    if (
      AccessTokenData &&
      Object.hasOwnProperty.call(AccessTokenData, 'message') &&
      AccessTokenData['message']
    ) {
      throw new InternalServerErrorException(
        'Getting Token failed. 2' + (AccessTokenData as ErrorType).message,
      );
    }
    const { access_token, expires_in, refresh_token } =
      AccessTokenData as RefreshTokenResponseType;
    const getProfile = await this.authService.getProfile(access_token);
    if (
      getProfile &&
      Object.hasOwnProperty.call(getProfile, 'email') &&
      Object.hasOwnProperty.call(getProfile, 'name') &&
      getProfile['name'] !== '' &&
      getProfile['email'] !== ''
    ) {
      const { name, email } = getProfile as ProfileResponseType;
      const timeInMilliseconds = this.getTimeInSecond(expires_in);
      const accessToken = await this.getJwt(email, name);
      const userRecordFind = {
        email: email,
        name: name,
        google_login_token: access_token,
        google_login_token_expiry: timeInMilliseconds,
        auth_token: accessToken,
        auth_token_expiry: timeInMilliseconds,
        refresh_google_login_token: refresh_token,
      } as Prisma.UserUncheckedCreateInput;
      this.userDbService.initiateConnection();
      const user = await this.userDbService.findOrCreate(userRecordFind, false);
      await this.userDbService.disconnect();
      if (user && user['id']) {
        const accessToken = await this.getJwt(email, name);
        if (user['id']) {
          const t = Number((user as User).auth_token_expiry);
          return {
            name,
            email,
            accessToken,
            accessTokenExpiry: t,
          };
        } else {
          throw new InternalServerErrorException(
            'User updation failed. 2' + (user as ErrorType).message,
          );
        }
      } else {
        console.log('user', user);
        throw new InternalServerErrorException(
          'User creation failed. 1' + (user as ErrorType).message,
        );
      }
    } else {
      throw new InternalServerErrorException('Google Auth Api access failed');
    }
  }
}
