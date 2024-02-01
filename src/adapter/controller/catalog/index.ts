import { Request, Response } from "express";
import { injectable, container } from "tsyringe";

import { CreateCatalogService } from "../../../core/usecase/catalog/create-catalog.service";
import { DeleteCatalogService } from "../../../core/usecase/catalog/delete-catalog.service";
import { GetAllCatalogsService } from "../../../core/usecase/catalog/get-all-catalogs.service";
import { GetAllCatalogsByMerchantService } from "../../../core/usecase/catalog/get-all-by-merchant.service";
import { GetCatalogService } from "../../../core/usecase/catalog/get-catalog.service";
import { UpdateCatalogService } from "../../../core/usecase/catalog/update-catalog.service";
import { CatalogRequestInterface } from "../../../adapter/types/catalog-request.interface";
import { AuthError } from "../../../adapter/utils/errors";

@injectable()
export class CatalogController {
  public async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const getAllCatalogsService = container.resolve(GetAllCatalogsService);
      const catalogs = await getAllCatalogsService.execute();
      if (catalogs.length > 0) {
        return res.status(200).json(catalogs);
      }
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(403).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async listAllByMerchantId(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const getAllByMerchantId = container.resolve(GetAllCatalogsByMerchantService);
      const catalogs = await getAllByMerchantId.execute(id);
      if (catalogs && catalogs.length > 0) {
        return res.status(200).json(catalogs);
      }
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(403).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async findById(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const getCatalogService = container.resolve(GetCatalogService);
      const catalog = await getCatalogService.execute(id);
      if (catalog) {
        return res.status(200).json(catalog);
      }
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(403).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response): Promise<unknown> {
    try {
      const bodyRequest = req.body as CatalogRequestInterface;
      const createCatalogService = container.resolve(CreateCatalogService);
      const create = await createCatalogService.execute(bodyRequest);
      return res.status(201).json(create);
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(403).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const bodyRequest = req.body as CatalogRequestInterface;
      const updateCatalogService = container.resolve(UpdateCatalogService);
      const update = await updateCatalogService.execute(bodyRequest, id);
      return res.status(201).json(update);
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(403).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const deleteCatalogService = container.resolve(DeleteCatalogService);
      const deleted = await deleteCatalogService.execute(id);
      if (deleted) {
        return res.status(200).send({ message: "OK" });
      }
    } catch (error: any) {
      if (error instanceof AuthError) {
        return res.status(403).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
