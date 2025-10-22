// types/LoginState.ts
export type LoginState = {
  error: null | string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  }
  success?: boolean;
  redirectTo?: string;
}

export type LoginCredentials = {
  email: string,
  password: string
}