import { Catalog } from "@core/entity/catalog";

export interface CategoryRequestInterface {
  name: string;
  description: string;
  is_active: boolean;
  catalogId: string;
}
