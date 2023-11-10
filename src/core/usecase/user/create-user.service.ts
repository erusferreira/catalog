import { inject, injectable, container } from "tsyringe";

import { UserRepositoryInterface } from '@core/repository/user-repository.interface';
import { UserRepository } from '@adapter/repository/user.repository';
import { RegisterRequest } from "@adapter/types/auth-request.interface";
import { AuthMapper } from "@adapter/mapper/auth";

@injectable()
export class CreateUserService {
  
  constructor(
    @inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface
    ) {}
    
    public async execute(userRegister: RegisterRequest) {
      const aRepository = container.resolve(UserRepository);
      const user = AuthMapper.registerToDomain(userRegister);
      const userSaved = await aRepository.register(user);
      return AuthMapper.registerToDTO(userSaved);
    }
    
  }
  