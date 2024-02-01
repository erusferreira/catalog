import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

import { GetAllMerchantsService } from '../../../core/usecase/merchant/get-all-merchants.service';
import { GetMerchantService } from '../../../core/usecase/merchant/get-merchant.service';
import { CreateMerchantService } from '../../../core/usecase/merchant/create-merchant.service';
import { UpdateMerchantService } from '../../../core/usecase/merchant/update-merchant.service';
import { logger } from '../../../adapter/utils/logger';
import { MerchantRequestInterface } from '../../../adapter/types/merchant-request.interface';
import { DeleteMerchantService } from '../../../core/usecase/merchant/delete-merchant.service';

@injectable()
export class MerchantController {
  async listAll(req: Request, res: Response): Promise<unknown> {
    try {
      const getAllMerchantsService = container.resolve(GetAllMerchantsService);
      const merchants = await getAllMerchantsService.execute();
      if (merchants.length > 0) {
        return res.status(200).json(merchants);
      }
    } catch (error: any) {
      logger.error(error);
      return res.status(500).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const getMerchantService = container.resolve(GetMerchantService);
      const merchant = await getMerchantService.execute(id);
      if (merchant) {
        return res.status(200).json(merchant);
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

  async update(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const bodyRequest = req.body as MerchantRequestInterface;
      const updateMerchantService = container.resolve(UpdateMerchantService);
      const create = await updateMerchantService.execute(bodyRequest, id);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<unknown> {
    try {
      const { id } = req.params;
      const deleteMerchantService = container.resolve(DeleteMerchantService);
      const deleted = await deleteMerchantService.execute(id);
      if (deleted) {
        return res.status(200).send({ message: "OK" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
