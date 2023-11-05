import { ProductRequestInterface } from "../../adapter/types/product-request.interface";
import { Product } from "../entity/product";

export interface ProductRepositoryInterface {
  listAll(): Promise<Product[]>;
  listAllByManufacturer(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(entity: ProductRequestInterface): Promise<Product>;
  update(entity: ProductRequestInterface): Promise<Product>;
  delete(id: string): Promise<void>;
}
