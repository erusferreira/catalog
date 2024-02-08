import { injectable, inject, container } from "tsyringe";

import { ItemRepository } from '../../../adapter/repository/item.repository';
import { ItemRepositoryInterface } from '../../../core/repository/item-repository.interface';
import { Item } from "../../../core/entity/item";

@injectable()
export class GetAllItemsByCategoryService {
  constructor(
    @inject('ItemRepositoryInterface') private itemRepository: ItemRepositoryInterface  
  ) {}

  public async execute(merchantId: string): Promise<Item[] | null> {
    const iRepository = container.resolve(ItemRepository);
    const catalogs = await iRepository.listAllByCategoryId(merchantId);
    return catalogs || [];
  }
}
