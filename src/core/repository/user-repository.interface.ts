import { User } from './../../core/entity/user';

export interface UserRepositoryInterface {
  listAll(): Promise<User[]>;
  findById(userId: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  register(merchant: User): Promise<User>;
}
