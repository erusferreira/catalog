import { injectable, inject, container } from 'tsyringe';
import { CategoryMapper } from '../../../adapter/mapper/category';

import { Category } from '../../../core/entity/category';
import { CategoryRepository } from '../../../adapter/repository/category.repository';
import { CategoryRepositoryInterface } from '../../../core/repository/category-repository.interface';
import { CategoryRequestInterface } from '../../../adapter/types/category-request.interface';
import { logger } from '../../../adapter/utils/logger';
import { CatalogRepository } from '../../../adapter/repository/catalog.repository';
import { CatalogRepositoryInterface } from '../../../core/repository/catalog-repository.interface';

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepositoryInterface') private categoryRepository: CategoryRepositoryInterface,
    @inject('CatalogRepositoryInterface') private catalogRepository: CatalogRepositoryInterface
  ) {}
  
  async execute(categoryRequest: CategoryRequestInterface, catalogId: string): Promise<Category[] | any> {
    const cgRepository = container.resolve(CatalogRepository);
    const cRepository = container.resolve(CategoryRepository);

    const catalog = await cgRepository.findById(catalogId);
    const category = CategoryMapper.categoryCreateToDomain(categoryRequest, catalog);
    const insertedCategory = await cRepository.create(category);
    const categoryDto = CategoryMapper.toDTO(insertedCategory);

    return categoryDto;
  }
}
