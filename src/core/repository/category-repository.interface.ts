import { Category } from "../entity/category";
import { CategoryRequestInterface } from '../../adapter/types/category-request.interface';

export interface CategoryRepositoryInterface {
  listAll(): Promise<Category[]>;
  listAllByCatalog(catalogId: string): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  create(entity: CategoryRequestInterface): Promise<Category>;
  update(entity: CategoryRequestInterface): Promise<Category>;
  delete(id: string): Promise<void>
}

