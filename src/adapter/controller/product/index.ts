import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

import { CreateProductService } from '../../../core/usecase/product/create-product.service';
import { ProductRequestInterface } from '../../../adapter/types/product-request.interface';
import { logger } from '../../../adapter/utils/logger';

@injectable()
export class ProductController {

  async create(req: Request, res: Response): Promise<unknown> {
    try {
      const bodyRequest = req.body as ProductRequestInterface;
      const createProductService = container.resolve(CreateProductService);
      const create = await createProductService.execute(bodyRequest);
      return res.status(201).json(create);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

}
