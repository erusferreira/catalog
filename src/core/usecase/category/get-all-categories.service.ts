import { injectable, inject, container } from 'tsyringe';

import { CategoryRepository } from '@adapter/repository/category.repository';
import { CategoryRepositoryInterface } from '@core/repository/category-repository.interface';
import { logger } from '@adapter/utils/logger';
import { Category } from '@core/entity/category';

@injectable()
export class GetAllCategoriesService {
  constructor(@inject('CategoryRepositoryInterface') private service: CategoryRepositoryInterface) {
  }
  
  public async execute(): Promise<Category[]> {
    const repository = container.resolve(CategoryRepository)
    return await repository.listAll();
  }
}
