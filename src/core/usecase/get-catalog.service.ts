import { injectable, inject, container } from "tsyringe";

import { CatalogRepositoryInterface } from "../repository/catalog-repository.interface";
import { CatalogRepository } from "../../adapter/repository/catalog.repository";
import { Catalog } from "../entity/catalog";

@injectable()
export class GetCatalogService {

  constructor(
    @inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface
  ) {}

  public async execute(catalogId: string): Promise<Catalog | null> {
    const cRepository = container.resolve(CatalogRepository);
    const catalog = await cRepository.findById(catalogId);
    if (catalog) {
      return catalog;
    } else {
      throw new Error(`Could not find a catalog containing the id: ${catalogId}`)
    }
  }
}
