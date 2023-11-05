import { injectable, inject, container } from 'tsyringe';

import { Merchant } from '../entity/merchant';
import { MerchantRepositoryInterface } from '../repository/merchant-repository.interface';
import { MerchantRepository } from '../../adapter/repository/merchant.repository';

@injectable()
export class GetAllMerchantsService {
  constructor(@inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface) {
  }
  
  public async execute(): Promise<Merchant[]> {
    const repository = container.resolve(MerchantRepository);
    return await repository.listAll();
  }
}
