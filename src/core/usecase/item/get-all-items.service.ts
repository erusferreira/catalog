import { injectable, inject, container } from 'tsyringe';

import { ItemRepository } from '../../../adapter/repository/item.repository';
import { ItemRepositoryInterface } from '../../../core/repository/item-repository.interface';
import { Item } from "../../../core/entity/item";

@injectable()
export class GetAllItemsService {
  constructor(@inject('ItemRepositoryInterface') private ItemRepository: ItemRepositoryInterface) {
  }
  
  public async execute(): Promise<Item[]> {
    const repository = container.resolve(ItemRepository);
    return await repository.listAll();
  }
}
