import { injectable, inject, container } from 'tsyringe';

import { CatalogRepository } from '../../../adapter/repository/catalog.repository';
import { CatalogRepositoryInterface } from '../../../core/repository/catalog-repository.interface';
import { logger } from '../../../adapter/utils/logger';
import { Catalog } from '../../../core/entity/catalog';

@injectable()
export class GetAllCatalogsService {
  constructor(@inject('CatalogRepositoryInterface') private service: CatalogRepositoryInterface) {
  }
  
  public async execute(): Promise<Catalog[]> {
    const repository = container.resolve(CatalogRepository)
    return await repository.listAll();
  }
}
