import { injectable } from 'tsyringe';

import { Category, CategoryModel } from '@core/entity/category';
import { CategoryRepositoryInterface } from '@core/repository/category-repository.interface';
import { CategoryRequestInterface } from '@adapter/types/category-request.interface';

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

  public async findById(categoryId: string): Promise<Category | null> {
    return await this.modelCategory.findById(categoryId);
  }
  
  public async create(entity: Category): Promise<Category> {
    return await this.modelCategory.create(entity);
  }

  public async update(entity: Category, catalogId: string): Promise<Category | null> {
    return await this.modelCategory.findByIdAndUpdate(catalogId, entity, {
      new: true,
      runValidators: true
    });
  }

  public async delete(category: Category): Promise<void | any> {
    const categoryToDelete = await this.findById(category.id);
    return categoryToDelete?.deleteOne();
  }
}
