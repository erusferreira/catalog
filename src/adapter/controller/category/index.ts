import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

import { CreateCategoryService } from '../../../core/usecase/category/create-category.service';
import { GetAllCategoriesService } from '../../../core/usecase/category/get-all-categories.service';
import { GetCategoryService } from '../../../core/usecase/category/get-category.service';
import { CategoryRequestInterface } from '../../../adapter/types/category-request.interface';
import { UpdateCategoryService } from '../../../core/usecase/category/update-category.service';
import { logger } from '../../../adapter/utils/logger';
import { DeleteCategoryService } from '../../../core/usecase/category/delete-category.service';

@injectable()
export class CategoryController {
  public async listAll(req: Request, res: Response): Promise<unknown> {
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

  public async findById(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const getCategoryService = container.resolve(GetCategoryService);
      const category = await getCategoryService.execute(id);
      if (category) {
        return res.status(200).json(category);
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

  public async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const bodyRequest = req.body as CategoryRequestInterface;
      const updateCategoryService = container.resolve(UpdateCategoryService);
      const update = await updateCategoryService.execute(bodyRequest, id);
      return res.status(201).json(update);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const deleteCategoryService = container.resolve(DeleteCategoryService);
      const deleted = await deleteCategoryService.execute(id);
      if (deleted) {
        return res.status(200).send({ message: "OK" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
