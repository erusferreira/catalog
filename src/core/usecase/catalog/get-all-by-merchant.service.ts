import { injectable, inject, container } from "tsyringe";

import { CatalogRepositoryInterface } from "@core/repository/catalog-repository.interface";
import { CatalogRepository } from "@adapter/repository/catalog.repository";
import { Catalog } from "@core/entity/catalog";

@injectable()
export class GetAllCatalogsByMerchantService {
  constructor(@inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface) {}

  public async execute(merchantId: string): Promise<Catalog[] | null> {
    const cRepository = container.resolve(CatalogRepository);
    const catalogs = await cRepository.listAllByMerchantId(merchantId);
    return catalogs || [];
  }
}
