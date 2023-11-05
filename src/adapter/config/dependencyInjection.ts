import { container } from 'tsyringe';

import { HealthCheckController } from '../controller/health';

import { CatalogRepository } from '../repository/catalog.repository';
import { CatalogRepositoryInterface } from '../../core/repository/catalog-repository.interface';
import { GetAllCatalogsService } from '../../core/usecase/get-all-catalogs.service';
import { CreateCatalogService } from '../../core/usecase/create-catalog.service';
import { CatalogController } from '../controller/catalog';

import { MerchantRepository } from '../repository/merchant.repository';
import { MerchantRepositoryInterface } from '../../core/repository/merchant-repository.interface';
import { GetAllMerchantsService } from '../../core/usecase/get-all-merchants.service';
import { CreateMerchantService } from '../../core/usecase/create-merchant.service';
import { MerchantController } from '../controller/merchant';

import { CreateCategoryService } from '../../core/usecase/create-category.service';
import { CategoryController } from '../controller/category';
import { GetAllCategoriesService } from '../../core/usecase/get-all-categories.service';
import { GetCatalogService } from '../../core/usecase/get-catalog.service';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryRepositoryInterface } from '../../core/repository/category-repository.interface';

export function addDependencyInjectionConfig(): void {
  container.register('HealthCheckController', { useClass: HealthCheckController });

  container.register('CatalogController', { useValue: CatalogController });
  container.register('GetAllCatalogsService', { useValue: GetAllCatalogsService });
  container.register('CreateCatalogService', { useValue: CreateCatalogService });
  container.register('CatalogRepositoryInterface', { useValue: CatalogRepository });

  container.register('MerchantController', { useValue: MerchantController });
  container.register('GetAllMerchantsService', { useValue: GetAllMerchantsService });
  container.register('CreateMerchantService', { useValue: CreateMerchantService });
  container.register('MerchantRepositoryInterface', { useValue: MerchantRepository });

  container.register('CategoryController', { useValue: CategoryController });
  container.register('GetAllCategoriesService', { useValue: GetAllCategoriesService });
  container.register('GetCatalogService', { useValue: GetCatalogService });
  container.register('CreateCategoryService', { useValue: CreateCategoryService });
  container.register('CategoryRepositoryInterface', { useValue: CategoryRepository})
}
