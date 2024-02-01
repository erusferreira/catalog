import { injectable, inject, container } from 'tsyringe';

import { MerchantRepositoryInterface } from '../../../core/repository/merchant-repository.interface';
import { MerchantRepository } from '../../../adapter/repository/merchant.repository';
import { logger } from '../../../adapter/utils/logger';

@injectable()
export class DeleteMerchantService {
  
  constructor(@inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface) {}
    
    async execute(id: string): Promise<boolean> {
      const mRepository = container.resolve(MerchantRepository);
      
      const deleteMerchant = await mRepository.findById(id);
      
      if (deleteMerchant) {
        await mRepository.delete(deleteMerchant);
        return true;
      } else {
        throw new Error('Merchant could not be deleted because was not found!');
      }
    }
  }
  