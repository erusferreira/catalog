import { Category } from "../../core/entity/category";
import { Product } from "../../core/entity/product";

export interface ItemRequestInterface {
    name: string;
    description: string;
    price: number;
    image: string;
    is_active: boolean;
    categoryId: string;
    productId: string;
}
