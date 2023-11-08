import { injectable, inject, container } from 'tsyringe';

import { Catalog } from '@core/entity/catalog';
import { CatalogRepositoryInterface } from '@core/repository/catalog-repository.interface';
import { CatalogRepository } from '@adapter/repository/catalog.repository';
import { CatalogRequestInterface } from '@adapter/types/catalog-request.interface';
import { CatalogMapper } from '@adapter/mapper/catalog';

@injectable()
export class UpdateCatalogService {
  
  constructor(@inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface ) {}
  
  public async execute(catalogRequest: CatalogRequestInterface, catalogId: string): Promise<Catalog | any> {
    const cRepository = container.resolve(CatalogRepository)

    const catalog = CatalogMapper.catalogUpdateToDomain(catalogRequest);
    const insertedCatalog = await cRepository.update(catalog, catalogId);
    
    if (insertedCatalog) {
      
      return CatalogMapper.toDTO(insertedCatalog);
    } else {
      throw new Error('Catalog could not be updated because was not found!')
    }

  }
}
