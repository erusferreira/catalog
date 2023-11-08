import { inject, injectable, container } from "tsyringe";

import { ItemRepositoryInterface } from "@core/repository/item-repository.interface";
import { ItemRepository } from '@adapter/repository/item.repository';
import { ItemRequestInterface } from "@adapter/types/item-request.interface";
import { ItemMapper } from "@adapter/mapper/item";
import { CategoryRepository } from "@adapter/repository/category.repository";
import { ProductRepository } from "@adapter/repository/product.repository";
import { Product } from "@core/entity/product";
import { ProductRequestInterface } from "@adapter/types/product-request.interface";

@injectable()
export class CreateItemService {
  
  constructor(
    @inject('ItemRepositoryInterface') private createItemRepository: ItemRepositoryInterface
  ) {}
    
  public async execute(itemRequest: ItemRequestInterface, categoryId: string, productId: string, product: Product) {
    const itemRepository = container.resolve(ItemRepository);
    const categoryRepository = container.resolve(CategoryRepository);
    const productRepository = container.resolve(ProductRepository);

    if (!categoryId) {
      throw new Error('Not possible to create an item because category id was not provided');
    }

    if (!productId && !product) {
      throw new Error('Not possible to create an item because the product was not provided');
    }
    
    let productReturned;
    if (productId) {
      productReturned = await productRepository.findById(productId);
    }

    if (!productId && product) {
      productReturned = await productRepository.create(product);
    }

    let categoryReturned;
    if (categoryId) {
      categoryReturned = await categoryRepository.findById(categoryId);
    }

    if (categoryReturned && productReturned) {
      const item = ItemMapper.itemCreateToDomain(itemRequest, categoryReturned, productReturned);
      const itemCreated = await itemRepository.create(item);
      const itemDTO = ItemMapper.toDTO(itemCreated);
      return itemDTO;
    } else {
      throw new Error('Not possible to create an item because category or product was not provided!');
    }
  }  

}
  