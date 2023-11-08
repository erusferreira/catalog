import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

import { GetAllMerchantsService } from '@core/usecase/merchant/get-all-merchants.service';
import { CreateMerchantService } from '@core/usecase/merchant/create-merchant.service';
import { logger } from '@adapter/utils/logger';
import { MerchantRequestInterface } from '@adapter/types/merchant-request.interface';

@injectable()
export class MerchantController {
  async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const getAllMerchantsService = container.resolve(GetAllMerchantsService);
      const catalogs = await getAllMerchantsService.execute();
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
      const bodyRequest = req.body as MerchantRequestInterface;
      const createMerchantService = container.resolve(CreateMerchantService);
      const create = await createMerchantService.execute(bodyRequest);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
