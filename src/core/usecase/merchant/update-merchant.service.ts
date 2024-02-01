import { injectable, inject, container } from 'tsyringe';

import { MerchantRepository } from '../../../adapter/repository/merchant.repository';
import { MerchantRepositoryInterface } from '../../../core/repository/merchant-repository.interface';
import { MerchantRequestInterface } from '../../../adapter/types/merchant-request.interface';
import { MerchantMapper } from '../../../adapter/mapper/merchant';

@injectable()
export class UpdateMerchantService {
  
  constructor(@inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface) {}
  
  public async execute(merchantRequest: MerchantRequestInterface, merchantId: string) {
    const mRepository = container.resolve(MerchantRepository);
    const merchant = await mRepository.findById(merchantId);
    if (merchant) {
      const merchantToUpdate = MerchantMapper.merchantUpdateToDomain(merchantRequest);
      const updatedMerchant = await mRepository.update(merchantToUpdate, merchantId);

      if (updatedMerchant) {
        return await MerchantMapper.toDTO(updatedMerchant);
      } else {
        throw new Error('Merchant could not be updated because was not found!')
      }
    }
    throw new Error('Merchant could not be updated because was not found!')
  }
}
