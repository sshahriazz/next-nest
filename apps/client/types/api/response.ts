export interface Response<T> {
  message: string;
  status: number;
  url: string;
  data: T;
}

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

export interface User {
  id: string;
  firstname: string;
  role: string[];
  lastname: string;
  email: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
