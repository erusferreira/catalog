import { injectable, inject, container } from 'tsyringe';

import { MerchantRepository } from '../../adapter/repository/merchant.repository';
import { MerchantRepositoryInterface } from '../repository/merchant-repository.interface';
import { MerchantRequestInterface } from '../../adapter/types/merchant-request.interface';

@injectable()
export class CreateMerchantService {

    constructor(@inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface) {}

    public async execute(merchantRequest: MerchantRequestInterface) {
        const mRepository = container.resolve(MerchantRepository);
        return await mRepository.create(merchantRequest);
    }
}
