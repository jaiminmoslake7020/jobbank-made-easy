export type ExampleResponseType = {
  message: string;
};

export type ErrorType = {
  message: string;
  error?: any;
};

export type SessionBodyDto = {
  access_token: string;
  authuser: number;
  expires_in: number;
  prompt: string;
  scope: string;
  state: string;
  token_type: string;
  code: string;
};

export * from './dto/address.dto';
export * from './dto/create-company.dto';
