import { injectable } from 'tsyringe';

import { Product, ProductModel } from "../../core/entity/product";
import { ProductRepositoryInterface } from "../../core/repository/product-repository.interface";
import { ProductRequestInterface } from '../../adapter/types/product-request.interface';

@injectable()
export class ProductRepository implements ProductRepositoryInterface {
  
  private modelProduct = ProductModel;
  
  public async findById(productId: string): Promise<Product | null> {
    return await this.modelProduct.findById(productId);
  }

  public async create(entity: ProductRequestInterface): Promise<Product> {
    return await this.modelProduct.create(entity);
  }

}
