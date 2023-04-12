export type AuthUser = {
  avatarUrl: string;
  email: string;
  id: number;
  name: string;
  token: string;
}

export type User = {
  id: number;
  name: string;
}

export type NewUser = {
  email: string;
  password: string;
}
