import { injectable, inject, container } from "tsyringe";

import { ItemRepositoryInterface } from "../../../core/repository/item-repository.interface";
import { ItemRepository } from "../../../adapter/repository/item.repository";
import { Item } from "core/entity/item";

@injectable()
export class GetItemService {
  constructor(
    @inject('ItemRepositoryInterface') private itemRepository: ItemRepositoryInterface
  ) {}

  public async execute(itemId: string): Promise<Item> {
    const iRepository = container.resolve(ItemRepository);
    const item = await iRepository.findById(itemId);
    
    if (item) {
      return item;
    } else {
      throw new Error(`Could not find a item containing the id: ${item}`)
    }
  }

}
