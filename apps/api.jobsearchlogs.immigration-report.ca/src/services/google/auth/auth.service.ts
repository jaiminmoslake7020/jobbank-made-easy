import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ErrorType } from '../../../types';
import * as process from 'process';

export type ProfileResponseType = {
  email: string;
  email_verified?: true;
  family_name?: string;
  given_name?: string;
  name: string;
  picture?: string;
  sub?: string;
};

export type AccessTokenResponseType = {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export type RefreshTokenResponseType = AccessTokenResponseType & {
  id_token: string;
  refresh_token: string;
};

@Injectable()
export class AuthService {
  constructor() {}
  getHeaders(access_token: string) {
    return {
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }
  async processRequest(
    access_token: string,
    url: string,
  ): Promise<ProfileResponseType | ErrorType> {
    try {
      const { data } = await axios.get(url, {
        headers: this.getHeaders(access_token),
      });
      return data;
    } catch (e) {
      console.log('e', e);
      return {
        message: 'getting profile failed with access token ' + access_token,
        error: e,
      };
    }
  }
  async getProfile(
    access_token: string,
  ): Promise<ProfileResponseType | ErrorType> {
    const data = await this.processRequest(
      access_token,
      'https://www.googleapis.com/oauth2/v3/userinfo',
    );
    console.log('data', data);
    return data;
  }
  async getAccessTokenDataWithRefreshToken(
    code: string,
  ): Promise<RefreshTokenResponseType | ErrorType> {
    try {
      const { data } = await axios.post(
        'https://www.googleapis.com/oauth2/v3/token',
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            client_id: process.env.GOOGLE_ID,
            client_secret: process.env.GOOGLE_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: process.env.REDIRECT_URI,
          },
        },
      );
      return data as RefreshTokenResponseType;
    } catch (e) {
      console.log('e', e);
      return {
        message: 'Refresh token failed with code ' + code,
        error: e,
      };
    }
  }
  async getNewAccessTokenData(
    refreshToken: string,
  ): Promise<ErrorType | AccessTokenResponseType> {
    try {
      const response = await axios.post(
        'https://www.googleapis.com/oauth2/v3/token',
        null,
        {
          params: {
            client_id: process.env.GOOGLE_ID,
            client_secret: process.env.GOOGLE_SECRET,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return response.data;
    } catch (e) {
      console.log('e', e);
      return {
        message: 'Refresh token failed with code ' + refreshToken,
        error: e,
      };
    }
  }
}
