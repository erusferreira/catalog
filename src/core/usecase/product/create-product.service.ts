import { injectable, inject, container } from "tsyringe";

import { ProductRepositoryInterface } from "../../../core/repository/product-repository.interface";
import { ProductRepository } from "../../../adapter/repository/product.repository";
import { ProductRequestInterface } from "../../../adapter/types/product-request.interface";

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductRepositoryInterface') private productRepository: ProductRepositoryInterface
  ) {}

  public async execute(product: ProductRequestInterface) {
    const productRepository = container.resolve(ProductRepository);
    const prod = await productRepository.create(product);
  }
}




  