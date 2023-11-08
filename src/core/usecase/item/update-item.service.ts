import { inject, injectable, container } from 'tsyringe';

import { Item } from '@core/entity/item';
import { ItemMapper } from '@adapter/mapper/item';
import { CategoryRepository } from '@adapter/repository/category.repository';
import { ItemRepository } from '@adapter/repository/item.repository';
import { ItemRequestInterface } from '@adapter/types/item-request.interface';
import { CategoryRepositoryInterface } from '@core/repository/category-repository.interface';
import { ItemRepositoryInterface } from '@core/repository/item-repository.interface';
import { ProductRepositoryInterface } from '@core/repository/product-repository.interface';
import { ProductRepository } from '@adapter/repository/product.repository';

@injectable()
export class UpdateItemService {
  
  constructor(
    @inject('ItemRepositoryInterface') private itemRepository: ItemRepositoryInterface,
    @inject('CategoryRepositoryInterface') private categoryRepository: CategoryRepositoryInterface,
    @inject('ProductRepositoryInterface') private productRepository: ProductRepositoryInterface
  ) {}

  public async execute(itemRequest: ItemRequestInterface, itemId: string) {
    const iRepository = container.resolve(ItemRepository);
    const cRepository = container.resolve(CategoryRepository);
    const pRepository = container.resolve(ProductRepository);

    const itemSaved = await iRepository.findById(itemId);
    const categorySaved = await cRepository.findById(itemRequest.categoryId);
    let productSaved;
    if (itemRequest.productId) {
      productSaved = await pRepository.findById(itemRequest.productId);
    }

    if (!itemSaved) {
      throw new Error(`Item not updated because the itemId: ${itemId} is not valid!`);
    }

    if (!categorySaved) {
      throw new Error(`Item not updated because the categoryId: ${itemRequest.categoryId} is not valid`);
    }

    if (!productSaved) {
      throw new Error(`Item not updated because the productId: ${itemRequest.productId} is not valid!`)
    }

    const item = ItemMapper.itemUpdateToDomain(itemRequest, categorySaved, productSaved);

    const updatedItem = await iRepository.update(itemRequest, itemId);
    if (updatedItem) {
      return ItemMapper.toDTO(updatedItem);
    } else {
      throw new Error('Item could not be updated because was not found!')
    }

  }
}
