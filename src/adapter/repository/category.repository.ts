import { injectable } from 'tsyringe';
import { Category, CategoryModel } from '../../core/entity/category';
import { CategoryRepositoryInterface } from '../../core/repository/category-repository.interface';
import { CategoryRequestInterface } from '../types/category-request.interface';

@injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  
  private modelCategory = CategoryModel;

  public async listAll(): Promise<Category[]> {
    const allCatalogs = await this.modelCategory.find();
    return allCatalogs;
  }

  public async listAllByCatalog(catalogId: string): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }

  public async findById(merchantId: string): Promise<Category | null> {
    return await this.modelCategory.findById(merchantId);
  }
  
  public async create(entity: CategoryRequestInterface): Promise<Category> {
    return await this.modelCategory.create(entity);
  }

  public async update(entity: CategoryRequestInterface): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
