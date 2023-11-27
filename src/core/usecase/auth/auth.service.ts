import { inject, injectable, container } from "tsyringe";
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

import { UserRepositoryInterface } from '@core/repository/user-repository.interface';
import { UserRepository } from '@adapter/repository/user.repository';
import { LoginRequest, RegisterRequest } from "@adapter/types/auth-request.interface";
import { AuthMapper } from "@adapter/mapper/auth";
import * as config from "@adapter/config/config";

@injectable()
export class AuthService {
  
  constructor(
    @inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface
  ) {}

    public async login(userLogin: LoginRequest) {
      const aRepository = container.resolve(UserRepository);
      const user = await aRepository.findByEmail(userLogin.email);

      if (!user) {
        throw new Error(`Usuário com o email: ${userLogin.email} não encontrado!`);
      }

      if (!user.is_active) {
        throw new Error(`Usuário desativado!`);
      }

      const passMatch = await bcrypt.compare(userLogin.password, user.password);

      if (!passMatch) {
        throw new Error(`Usuário não autorizado!`);
      }
      const token = jwt.sign({id: user.id}, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN_SECONDS })
      return AuthMapper.loginToDTO(user, token);
    }

}
