import { injectable } from "tsyringe";

import { UserRepositoryInterface } from "@core/repository/user-repository.interface";
import { User, UserModel } from "@core/entity/user";

@injectable()
export class UserRepository implements UserRepositoryInterface {

  private modelUser = UserModel;

  public async listAll(): Promise<User[]> {
    return await this.modelUser.find();
  }

  public async findById(userId: string): Promise<User | null> {
    return await this.modelUser.findById(userId);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.modelUser.findOne({ email: email }).exec();
  }

  public async register(user: User): Promise<User> {
    return await this.modelUser.create(user);
  }
}
