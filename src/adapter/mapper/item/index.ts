import { ItemRequestInterface } from "@adapter/types/item-request.interface";
import { Category } from "@core/entity/category";
import { Item } from "@core/entity/item";
import { Product } from "@core/entity/product";

export class ItemMapper {
  
  public static itemCreateToDomain(itemRequest: ItemRequestInterface, category: Category, product: Product) {
    const item = {
      name: itemRequest.name,
      description: itemRequest.description,
      price: itemRequest.price,
      image: itemRequest.image,
      is_active: itemRequest.is_active,
      category: category,
      product: product
    };
    return item as Item;
  }

  public static itemUpdateToDomain(itemRequest: ItemRequestInterface, category: Category, product: Product) {
    const item = {
      name: itemRequest.name,
      description: itemRequest.description,
      price: itemRequest.price,
      image: itemRequest.image,
      is_active: itemRequest.is_active,
      category: category,
      product: product
    };
    return item as Item;
  }

  public static toDTO(item: Item) {
    const result = {
      id: item._id.toString(),
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      is_active: item.is_active,
      category: item.category,
      product: item.product
    }
    return result;
  }
}