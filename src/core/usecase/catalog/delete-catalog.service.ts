import { injectable, inject, container } from 'tsyringe';

import { CatalogRepository } from '../../../adapter/repository/catalog.repository';
import { CatalogRepositoryInterface } from '../../../core/repository/catalog-repository.interface';
import { logger } from '../../../adapter/utils/logger';

@injectable()
export class DeleteCatalogService {
  constructor(
    @inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface
  ) {}
  
  async execute(id: string): Promise<boolean> {
    const cRepository = container.resolve(CatalogRepository);

    const deleteCatalog = await cRepository.findById(id);

    if (deleteCatalog) {
        await cRepository.delete(deleteCatalog);
        return true;
    } else {
      throw new Error('Catalog could not be deleted because was not found!');
    }
  }
}
