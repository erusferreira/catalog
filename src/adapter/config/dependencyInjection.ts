import { container } from 'tsyringe';

import { HealthCheckController } from '@adapter/controller/health';

import { CatalogRepository } from '@adapter/repository/catalog.repository';
import { CatalogRepositoryInterface } from '@core/repository/catalog-repository.interface';
import { GetAllCatalogsService } from '@core/usecase/catalog/get-all-catalogs.service';
import { GetCatalogService } from '@core/usecase/catalog/get-catalog.service';
import { CreateCatalogService } from '@core/usecase/catalog/create-catalog.service';
import { UpdateCatalogService } from '@core/usecase/catalog/update-catalog.service';
import { DeleteCatalogService } from '@core/usecase/catalog/delete-catalog.service';
import { CatalogController } from '@adapter/controller/catalog';

import { MerchantRepository } from '@adapter/repository/merchant.repository';
import { MerchantRepositoryInterface } from '@core/repository/merchant-repository.interface';
import { GetAllMerchantsService } from '@core/usecase/merchant/get-all-merchants.service';
import { CreateMerchantService } from '@core/usecase/merchant/create-merchant.service';
import { MerchantController } from '@adapter/controller/merchant';

import { CreateCategoryService } from '@core/usecase/category/create-category.service';
import { CategoryController } from '@adapter/controller/category';
import { GetAllCategoriesService } from '@core/usecase/category/get-all-categories.service';
import { GetCategoryService } from '@core/usecase/category/get-category.service';
import { CategoryRepository } from '@adapter/repository/category.repository';
import { UpdateCategoryService } from '@core/usecase/category/update-category.service';
import { DeleteCategoryService } from '@core/usecase/category/delete-category.service';
import { CategoryRepositoryInterface } from '@core/repository/category-repository.interface';

export function addDependencyInjectionConfig(): void {
  container.register('HealthCheckController', { useClass: HealthCheckController });

  container.register('CatalogController', { useValue: CatalogController });
  container.register('GetAllCatalogsService', { useValue: GetAllCatalogsService });
  container.register('GetCatalogService', { useValue: GetCatalogService });
  container.register('CreateCatalogService', { useValue: CreateCatalogService });
  container.register('UpdateCatalogService', { useValue: UpdateCatalogService });
  container.register('DeleteCatalogService', { useValue: DeleteCatalogService });
  container.register('CatalogRepositoryInterface', { useValue: CatalogRepository });

  container.register('MerchantController', { useValue: MerchantController });
  container.register('GetAllMerchantsService', { useValue: GetAllMerchantsService });
  container.register('CreateMerchantService', { useValue: CreateMerchantService });
  container.register('MerchantRepositoryInterface', { useValue: MerchantRepository });

  container.register('CategoryController', { useValue: CategoryController });
  container.register('GetAllCategoriesService', { useValue: GetAllCategoriesService });
  container.register('GetCategoryService', { useValue: GetCategoryService });
  container.register('CreateCategoryService', { useValue: CreateCategoryService });
  container.register('UpdateCategoryService', { useValue: UpdateCategoryService });
  container.register('DeleteCategoryService', { useValue: DeleteCategoryService });
  container.register('CategoryRepositoryInterface', { useValue: CategoryRepository})
}
