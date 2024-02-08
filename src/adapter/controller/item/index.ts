import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

import { GetItemService } from '../../../core/usecase/item/get-item.service';
import { GetAllItemsService } from 'core/usecase/item/get-all-items.service';
import { GetAllItemsByCategoryService } from 'core/usecase/item/get-all-by-category.service';
import { CreateItemService } from '../../../core/usecase/item/create-item.service';
import { DeleteItemService } from '../../../core/usecase/item/delete-item.service';
import { ItemRequestInterface } from '../../../adapter/types/item-request.interface';
import { logger } from '../../../adapter/utils/logger';
import { UpdateItemService } from '../../../core/usecase/item/update-item.service';

@injectable()
export class ItemController {

  async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const getAllItemsService = container.resolve(GetAllItemsService);
      const items = await getAllItemsService.execute();
      if (items.length > 0) {
        return res.status(200).json(items);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const getItemService = container.resolve(GetItemService);
      const item = await getItemService.execute(id);
      if (item) {
        return res.status(200).json(item);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async findAllByCategory(req: Request, res: Response): Promise<unknown> {
    try {
      logger.debug(req);
      const { id } = req.params;
      const getAllItemsByCategoryService = container.resolve(GetAllItemsByCategoryService);
      const items = await getAllItemsByCategoryService.execute(id);
      if (items) {
        return res.status(200).json(items);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<unknown> {
    try {
      const bodyRequest = req.body as ItemRequestInterface;
      const categoryId = req.body.categoryId;
      const productId = req.body.productId;
      const product = req.body.product;
      const createItemService = container.resolve(CreateItemService);
      const create = await createItemService.execute(bodyRequest, categoryId, productId, product);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const bodyRequest = req.body as ItemRequestInterface;
      const updateItemService = container.resolve(UpdateItemService);
      const create = await updateItemService.execute(bodyRequest, id);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const deleteItemService = container.resolve(DeleteItemService);
      const deleted = await deleteItemService.execute(id);
      if (deleted) {
        return res.status(200).send({ message: "OK" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
