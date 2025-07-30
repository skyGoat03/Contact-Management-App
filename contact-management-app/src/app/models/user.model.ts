export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface RegisterResponse {
  _id: string;
  email: string;
}

export interface CurrentUserResponse {
  username: string;
  email: string;
  id: string;
} 