import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';
import { CreateCatalogService } from '../../../core/usecase/create-catalog.service';
import { DeleteCatalogService } from '../../../core/usecase/delete-catalog.service';

import { GetAllCatalogsService } from '../../../core/usecase/get-all-catalogs.service';
import { GetCatalogService } from '../../../core/usecase/get-catalog.service';
import { UpdateCatalogService } from '../../../core/usecase/update-catalog.service';
import { CatalogRequestInterface } from '../../types/catalog-request.interface';
import { logger } from '../../utils/logger';

@injectable()
export class CatalogController {
  async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const getAllCatalogsService = container.resolve(GetAllCatalogsService);
      const catalogs = await getAllCatalogsService.execute();
      if (catalogs.length > 0) {
        return res.status(200).json(catalogs);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const getCatalogService = container.resolve(GetCatalogService);
      const catalog = await getCatalogService.execute(id);
      if (catalog) {
        return res.status(200).json(catalog);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<unknown> {
    try {
      const bodyRequest = req.body as CatalogRequestInterface;
      const merchantId = req.body.merchant.id;
      const createCatalogService = container.resolve(CreateCatalogService);
      const create = await createCatalogService.execute(bodyRequest, merchantId);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const bodyRequest = req.body as CatalogRequestInterface;
      const updateCatalogService = container.resolve(UpdateCatalogService);
      const update = await updateCatalogService.execute(bodyRequest, id);
      return res.status(201).json(update);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const deleteCatalogService = container.resolve(DeleteCatalogService);
      const deleted = await deleteCatalogService.execute(id);
      if (deleted) {
        return res.status(200).send({ message: "OK" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
