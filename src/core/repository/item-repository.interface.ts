import { Item } from "@core/entity/item";
import { ItemRequestInterface } from '@adapter/types/item-request.interface';

export interface ItemRepositoryInterface {
  listAllByCategory(categoryId: string): Promise<Item[]>;
  findById(id: string): Promise<Item | null>;
  create(entity: ItemRequestInterface): Promise<Item>;
  update(entity: ItemRequestInterface): Promise<Item>;
  delete(id: string): Promise<void>
}

