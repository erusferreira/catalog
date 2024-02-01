import { inject, injectable, container } from "tsyringe";

import { User } from "../../../core/entity/user";
import { UserRepositoryInterface } from '../../../core/repository/user-repository.interface';
import { UserRepository } from "../../../adapter/repository/user.repository";

@injectable()
export class GetAllUsersService {

  constructor(@inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface) {}

  public async execute(): Promise<User[]> {
    const uRepository = container.resolve(UserRepository);
    return await uRepository.listAll();
  }
}
