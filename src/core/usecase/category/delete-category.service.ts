import { injectable, inject, container } from 'tsyringe';

import { CategoryRepository } from '@adapter/repository/category.repository';
import { CategoryRepositoryInterface } from '@core/repository/category-repository.interface';
import { logger } from '@adapter/utils/logger';

@injectable()
export class DeleteCategoryService {
  constructor(
    @inject('CategoryRepositoryInterface') private categoryRepository: CategoryRepositoryInterface
  ) {}
  
  async execute(id: string): Promise<boolean> {
    const cRepository = container.resolve(CategoryRepository);

    const deleteCategory = await cRepository.findById(id);

    if (deleteCategory) {
        await cRepository.delete(deleteCategory);
        return true;
    } else {
      throw new Error('Catalog could not be deleted because was not found!');
    }
  }
}
