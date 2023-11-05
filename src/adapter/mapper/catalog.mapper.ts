import { Catalog } from "../../core/entity/catalog"
import { Merchant } from "../../core/entity/merchant";
import { CatalogRequestInterface } from "../types/catalog-request.interface";

export class CatalogMapper {
  
  public static catalogCreateToDomain(catalogRequest: CatalogRequestInterface, merchant: Merchant | null) {
    const catalog = {
      name: catalogRequest.name,
      description: catalogRequest.description,
      merchant: merchant,
      is_active: true
    };
    return catalog as Catalog
  }

  public static catalogUpdateToDomain(catalogUpdateRequest: CatalogRequestInterface) {
    const catalog = {
      name: catalogUpdateRequest.name,
      description: catalogUpdateRequest.description,
      merchant: catalogUpdateRequest.merchant,
      is_active: catalogUpdateRequest.is_active
    };
    return catalog as Catalog
  }

  public static toDTO(catalog: Catalog) {
    const result = {
      id: catalog._id.toString(),
      name: catalog.name,
      description: catalog.description,
      is_active: catalog.is_active 
    }
    return result;
  }
}
