import { Merchant } from "../../core/entity/merchant";

export interface CatalogResponse {
  name: string;
  description: string,
  merchant: Merchant,
  create_at: Date,
  update_at: Date,
  is_active: boolean
}