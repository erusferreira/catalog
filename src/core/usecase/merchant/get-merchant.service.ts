import { injectable, inject, container } from 'tsyringe';

import { Merchant } from '@core/entity/merchant';
import { MerchantRepositoryInterface } from '@core/repository/merchant-repository.interface';
import { MerchantRepository } from '@adapter/repository/merchant.repository';

@injectable()
export class GetMerchantService {
  constructor(@inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface) {
  }
  
  public async execute(merchantId: string): Promise<Merchant | null> {
    const repository = container.resolve(MerchantRepository);
    return await repository.findById(merchantId);
  }
}
