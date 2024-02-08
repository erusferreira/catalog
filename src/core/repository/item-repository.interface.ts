import { Item } from "./../../core/entity/item";
import { ItemRequestInterface } from './../../adapter/types/item-request.interface';

export interface ItemRepositoryInterface {
  findById(id: string): Promise<Item | null>;
  listAllByCategoryId(categoryId: string): Promise<Item[]>;
  create(entity: Item): Promise<Item>;
  update(entity: ItemRequestInterface, itemId: string): Promise<Item | null> ;
  delete(item: Item): Promise<void | any>
}

