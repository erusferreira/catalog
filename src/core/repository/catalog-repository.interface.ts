import { CatalogRequestInterface } from "@adapter/types/catalog-request.interface";
import { Catalog } from "@core/entity/catalog";

export interface CatalogRepositoryInterface {
  listAll(): Promise<Catalog[]>;
  findById(id: string): Promise<Catalog | null>;
  create(entity: Catalog): Promise<Catalog>;
  update(entity: Catalog, catalogId: string): Promise<Catalog | null>;
  delete(catalog: Catalog): Promise<void | null>;
}
