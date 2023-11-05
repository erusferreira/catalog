import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';
import { CreateCategoryService } from '../../../core/usecase/create-category.service';
import { GetAllCategoriesService } from '../../../core/usecase/get-all-categories.service';
import { CategoryRequestInterface } from '../../types/category-request.interface';
import { logger } from '../../utils/logger';

@injectable()
export class CategoryController {
  async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const getAllCategoriesService = container.resolve(GetAllCategoriesService);
      const catalogs = await getAllCategoriesService.execute();
      if (catalogs.length > 0) {
        return res.status(200).json(catalogs);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<unknown> {
    try {
      const bodyRequest = req.body as CategoryRequestInterface;
      const catalogId = req.body.catalog.id;
      const createCategoryService = container.resolve(CreateCategoryService);
      const create = await createCategoryService.execute(bodyRequest, catalogId);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
