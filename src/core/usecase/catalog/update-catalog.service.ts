import { injectable, inject, container } from 'tsyringe';

import { Catalog } from '@core/entity/catalog';
import { CatalogRepositoryInterface } from '@core/repository/catalog-repository.interface';
import { CatalogRepository } from '@adapter/repository/catalog.repository';
import { CatalogRequestInterface } from '@adapter/types/catalog-request.interface';
import { CatalogMapper } from '@adapter/mapper/catalog';
import { MerchantRepositoryInterface } from '@core/repository/merchant-repository.interface';
import { MerchantRepository } from '@adapter/repository/merchant.repository';

@injectable()
export class UpdateCatalogService {
  
  constructor(
    @inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface,
    @inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface
  ) {}
  
  public async execute(catalogRequest: CatalogRequestInterface, catalogId: string): Promise<Catalog | any> {
    const mRepository = container.resolve(MerchantRepository);
    const cRepository = container.resolve(CatalogRepository)

    const merchant = await mRepository.findById(catalogRequest.merchantId);

    if (!merchant) {
      throw new Error(`Update not allowed because merchantId: ${catalogRequest.merchantId} was not found!`);
    }

    const catalog = CatalogMapper.catalogUpdateToDomain(catalogRequest, merchant);
    const insertedCatalog = await cRepository.update(catalog, catalogId);

    if (insertedCatalog) {
      return CatalogMapper.toDTO(insertedCatalog);
    } else {
      throw new Error('Catalog could not be updated because was not found!')
    }

  }
}
