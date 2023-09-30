import { UserEntity } from './user.entity';

export class Token {
  accessToken: string;

  refreshToken: string;
}
export interface LoginResponse {
  tokens: Token;
  user: UserEntity;
}
export type SignupResponse = LoginResponse;
