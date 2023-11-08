import { ProductRequestInterface } from "@adapter/types/product-request.interface";
import { Manufacturer } from "@core/entity/manufacturer";
import { Product } from "@core/entity/product";

export class ProductMapper {
  
  public static productCreateToDomain(productRequest: ProductRequestInterface, manufacturer: Manufacturer) {
    const product = {
      name: productRequest.name,
      description: productRequest.description,
      ean_code: productRequest.ean_code,
      unit_measurement: productRequest.unit_measurement,
      is_active: true,
      manufaturer: manufacturer
    }
  return product as Product;
}

public static toDTO(product: Product) {
  const result = {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    ean_code: product.ean_code,
    unit_measurement: product.unit_measurement,
    is_active: product.is_active,
    manufaturer: product.manufaturer
  }
  return result;
}
}