export interface UserSignUpResponse {
  message: string;
}

export interface UserVerifyEmailResponse {
  message: string;
}
export interface UserLoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}
