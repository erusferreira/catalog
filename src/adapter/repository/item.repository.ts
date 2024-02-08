import { injectable } from 'tsyringe';

import { ItemRepositoryInterface } from "../../core/repository/item-repository.interface";
import { Item, ItemModel } from "../../core/entity/item";
import { ItemRequestInterface } from '../../adapter/types/item-request.interface';

@injectable()
export class ItemRepository implements ItemRepositoryInterface {
  
  private modelItem = ItemModel;

  public async listAll(): Promise<Item[]> {
    return await this.modelItem.find();
  }

  public async findById(itemId: string): Promise<Item | null> {
    return await this.modelItem.findById(itemId);
  }

  public async listAllByCategoryId(categoryId: string): Promise<Item[]> {
    return await this.modelItem.find({ category: categoryId });
  }
  
  public async create(entity: Item): Promise<Item> {
    return await this.modelItem.create(entity);
  }

  public async update(entity: ItemRequestInterface, itemId: string): Promise<Item | null> {
    return await this.modelItem.findByIdAndUpdate(itemId, entity, {
      new: true,
      runValidators: true
    });
  }

  public async delete(item: Item): Promise<void | any> {
    const itemToDelete = await this.findById(item.id);
    return itemToDelete?.deleteOne();
  }

}
