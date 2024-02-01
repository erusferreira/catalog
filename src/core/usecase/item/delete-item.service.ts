import { injectable, inject, container } from 'tsyringe';

import { ItemRepository } from '../../../adapter/repository/item.repository';
import { ItemRepositoryInterface } from '../../../core/repository/item-repository.interface';
import { logger } from '../../../adapter/utils/logger';

@injectable()
export class DeleteItemService {
  constructor(
    @inject('ItemRepositoryInterface') private itemRepository: ItemRepositoryInterface
  ) {}
  
  async execute(id: string): Promise<boolean> {
    const iRepository = container.resolve(ItemRepository);

    const deleteItem = await iRepository.findById(id);

    if (deleteItem) {
        await iRepository.delete(deleteItem);
        return true;
    } else {
      throw new Error('Item could not be deleted because was not found!');
    }
  }
}
