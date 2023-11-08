import { injectable, inject, container } from 'tsyringe';

import { CatalogMapper } from '@adapter/mapper/catalog';
import { MerchantRepository } from '@adapter/repository/merchant.repository';
import { CatalogRepository } from '@adapter/repository/catalog.repository';
import { CatalogRepositoryInterface } from '@core/repository/catalog-repository.interface';
import { MerchantRepositoryInterface } from '@core/repository/merchant-repository.interface';
import { CatalogRequestInterface } from '@adapter/types/catalog-request.interface';
import { logger } from '@adapter/utils/logger';
import { Catalog } from '@core/entity/catalog';

@injectable()
export class CreateCatalogService {
  constructor(
    @inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface,
    @inject('MerchantRepositoryInterface') private merchantRepository: MerchantRepositoryInterface
  ) {}
  
  public async execute(cataloRequest: CatalogRequestInterface, merchantId: string): Promise<Catalog[] | any> {
    const mRepository = container.resolve(MerchantRepository);
    const cRepository = container.resolve(CatalogRepository);

    const merchant = await mRepository.findById(merchantId);
    const catalog = CatalogMapper.catalogCreateToDomain(cataloRequest, merchant);
    const insertedCatalog = await cRepository.create(catalog);
    const catalogDto = CatalogMapper.toDTO(insertedCatalog);

    return catalogDto;
  }
}
