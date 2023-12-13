import { ProductRequestInterface } from "@adapter/types/product-request.interface";
import { Product } from "@core/entity/product";

export interface ProductRepositoryInterface {
  findById(productId: string): Promise<Product | null>
  create(entity: ProductRequestInterface): Promise<Product>;
}
