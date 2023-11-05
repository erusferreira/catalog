import { Catalog } from "../../core/entity/catalog";
import { Category } from "../../core/entity/category"
import { CategoryRequestInterface } from "../types/category-request.interface";

export class CategoryMapper {
  
  public static categoryCreateToDomain(categoryRequest: CategoryRequestInterface, catalog: Catalog | null) {
    const category = {
      name: categoryRequest.name,
      description: categoryRequest.description,
      catalog: catalog,
      is_active: true
    };
    return category as Category
  }

  public static toDTO(category: Category) {
    const result = {
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      catalog: category.catalog,
      is_active: category.is_active
    }
    return result;
  }
}
