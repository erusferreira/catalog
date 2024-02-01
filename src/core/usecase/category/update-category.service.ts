import { injectable, inject, container } from 'tsyringe';

import { Category } from '../../../core/entity/category';
import { CategoryRepositoryInterface } from '../../../core/repository/category-repository.interface'; 
import { CategoryRepository } from '../../../adapter/repository/category.repository';
import { CategoryRequestInterface } from '../../../adapter/types/category-request.interface';
import { CategoryMapper } from '../../../adapter/mapper/category';
import { logger } from '../../../adapter/utils/logger';
import { CatalogRepositoryInterface } from '../../../core/repository/catalog-repository.interface';
import { CatalogRepository } from '../../../adapter/repository/catalog.repository';
import { CatalogMapper } from '../../../adapter/mapper/catalog';

@injectable()
export class UpdateCategoryService {
  
  constructor(
    @inject('CategoryRepositoryInterface') private categoryRepository: CategoryRepositoryInterface,
    @inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface
  ) {}
  
  public async execute(categoryRequest: CategoryRequestInterface, categoryId: string): Promise<Category | any> {
    const cRepository = container.resolve(CategoryRepository);
    const catalogRepository = container.resolve(CatalogRepository);

    const categorySaved = await cRepository.findById(categoryId);
    const catalogSaved = await catalogRepository.findById(categoryRequest.catalogId);

    if (categorySaved && catalogSaved) {
    
      const catalogDto = CatalogMapper.toDTO(catalogSaved);

      if (categoryRequest.catalogId != catalogDto.id) {
        throw new Error(`Not allowed to update the category id: ${categoryId} because is not part of catalog id: ${categoryRequest.catalogId}`)
      }

      const category = CategoryMapper.categoryUpdateToDomain(categoryRequest, catalogSaved);
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
