import { RoleType } from "@adapter/enums";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  is_active: boolean;
  roles: RoleType[];
}
