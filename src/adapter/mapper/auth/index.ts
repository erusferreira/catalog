import bcrypt from 'bcrypt';

import { RegisterRequest } from "../../../adapter/types/auth-request.interface";
import { User } from "../../../core/entity/user";
import { Merchant } from '../../../core/entity/merchant';
import { RoleType } from "../../../adapter/enums";

export class AuthMapper {
  public static registerToDomain(user: RegisterRequest) {
    const register = {
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, 10),
      cpf: user.cpf,
      is_active: true,
      roles: RoleType.User
    }
    return register as User;
  }

  public static registerToDTO(user: User) {
    const register = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      is_active: user.is_active,
      roles: user.roles
    }
    return register;
  }

  public static loginToDTO(user: User, token: string,
     merchants: Merchant[] 
     ) {
    const login = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      is_active: user.is_active,
      roles: user.roles,
      // TO DO - Allow multiple merchants when FE is ready
      merchant: merchants[0] && merchants[0].id ? merchants[0].id : [],
      token
    }
    return login;
  }
  
}
