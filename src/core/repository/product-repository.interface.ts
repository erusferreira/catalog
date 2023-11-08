import { ProductRequestInterface } from "@adapter/types/product-request.interface";
import { Product } from "@core/entity/product";

export interface ProductRepositoryInterface {
  create(entity: ProductRequestInterface): Promise<Product>;
}
