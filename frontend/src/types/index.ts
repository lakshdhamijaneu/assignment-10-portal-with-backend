export interface User {
  fullName: string;
  email: string;
  password?: string;
  _id?: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface BackendUser {
  _id: string;
  fullName: string;
  email: string;
  imagePath?: string;
}

export interface UsersResponse {
  users: BackendUser[];
}

