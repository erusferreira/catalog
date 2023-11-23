import { injectable } from 'tsyringe';

import { Catalog, CatalogModel } from '@core/entity/catalog';
import { CatalogRepositoryInterface } from '@core/repository/catalog-repository.interface';
import { CatalogRequestInterface } from '@adapter/types/catalog-request.interface';

@injectable()
export class CatalogRepository implements CatalogRepositoryInterface {
  
  private modelCatalog = CatalogModel;
  
  public async listAll(): Promise<Catalog[]> {
    const allCatalogs = await this.modelCatalog.find();
    return allCatalogs;
  }

  public async listAllByMerchantId(merchantId: string): Promise<Catalog[] | null> {
    return await this.modelCatalog.find({
      merchant: merchantId
    })
  }

  public async findById(catalogId: string): Promise<Catalog | null> {
    return await this.modelCatalog.findById(catalogId);
  }

  public async create(entity: Catalog): Promise<Catalog> {
    return await this.modelCatalog.create(entity);
  }

  public async update(entity: Catalog, catalogId: string): Promise<Catalog | null> {
    return await this.modelCatalog.findByIdAndUpdate(catalogId, entity, {
      new: true,
      runValidators: true
    });
  }

  public async delete(catalog: Catalog): Promise<void | any> {
    const catalogToDelete = await this.findById(catalog.id);
    return catalogToDelete?.deleteOne();
  }
}
