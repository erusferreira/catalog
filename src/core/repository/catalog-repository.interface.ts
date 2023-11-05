import { CatalogRequestInterface } from "../../adapter/types/catalog-request.interface";
import { Catalog } from "../entity/catalog";

export interface CatalogRepositoryInterface {
  listAll(): Promise<Catalog[]>;
  findById(id: string): Promise<Catalog | null>;
  create(entity: CatalogRequestInterface): Promise<Catalog>;
  update(entity: CatalogRequestInterface, catalogId: string): Promise<Catalog | null>;
  delete(catalog: Catalog): Promise<void | null>;
}
