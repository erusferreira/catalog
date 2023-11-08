import { injectable, inject, container } from 'tsyringe';

import { Category } from '@core/entity/category';
import { CategoryRepositoryInterface } from '@core/repository/category-repository.interface'; 
import { CategoryRepository } from '@adapter/repository/category.repository';
import { CategoryRequestInterface } from '@adapter/types/category-request.interface';
import { CategoryMapper } from '@adapter/mapper/category';
import { logger } from '@adapter/utils/logger';

@injectable()
export class UpdateCategoryService {
  
  constructor(@inject('CategoryRepositoryInterface') private categoryRepository: CategoryRepositoryInterface ) {}
  
  public async execute(categoryRequest: CategoryRequestInterface, categoryId: string): Promise<Category | any> {
    const cRepository = container.resolve(CategoryRepository)


    const categorySaved = await cRepository.findById(categoryId);

    if (categorySaved) {
      const categoryIdSaved = CategoryMapper.toDTO(categorySaved);
      if (categoryRequest.catalog != categoryIdSaved.catalog) {
        throw new Error(`Not allowed to update the category id: ${categoryId} because is not part of catalog id: ${categoryRequest.catalog}`)
      }

      const category = CategoryMapper.categoryUpdateToDomain(categoryRequest);
      const insertedCategory = await cRepository.update(category, categoryId);
      
      if (insertedCategory) {
        return CategoryMapper.toDTO(insertedCategory);
      } else {
        throw new Error('Category could not be updated because was not found!')
      }
    } 

    throw new Error('Category could not be updated because was not found!')
    

    

  }
}
