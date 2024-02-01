import { injectable, inject, container } from 'tsyringe';

import { MerchantRepository } from '../../../adapter/repository/merchant.repository';
import { MerchantRepositoryInterface } from '../../../core/repository/merchant-repository.interface';
import { MerchantRequestInterface } from '../../../adapter/types/merchant-request.interface';
import { UserRepository } from '../../../adapter/repository/user.repository';
import { UserRepositoryInterface } from '../../../core/repository/user-repository.interface';
import { AuthMapper } from '../../../adapter/mapper/auth';
import { MerchantMapper } from '../../../adapter/mapper/merchant';

@injectable()
export class CreateMerchantService {
  
  constructor(
    @inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface,
    @inject('UserRepositoryInterface') private userRepository: UserRepositoryInterface
    ) {}
    
    public async execute(merchantRequest: MerchantRequestInterface) {
      const mRepository = container.resolve(MerchantRepository);
      const uRepository = container.resolve(UserRepository);

      const userSaved = await uRepository.findById(merchantRequest.owner_id);
      if (!userSaved) {
        throw new Error(`Not possible to create the merchant, because the user with id: ${merchantRequest.owner_id} doesnt exists!`);
      }

      const merchantToDomain = MerchantMapper.merchantCreateToDomain(merchantRequest, userSaved);
      const merchant = await mRepository.create(merchantToDomain);
      const merchantDTO = MerchantMapper.toDTO(merchant);
      return merchantDTO;
    }
  }
  