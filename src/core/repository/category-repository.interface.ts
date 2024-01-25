import { Category } from "@core/entity/category";
import { CategoryRequestInterface } from '@adapter/types/category-request.interface';

export interface CategoryRepositoryInterface {
  listAll(): Promise<Category[]>;
  listAllByCatalog(catalogId: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  create(entity: Category): Promise<Category>;
  update(entity: Category, catalogId: string): Promise<Category | null>;
  delete(category: Category): Promise<void | null>;
}

