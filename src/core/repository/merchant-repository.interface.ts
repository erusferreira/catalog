import { Merchant } from "./../../core/entity/merchant";
import { MerchantRequestInterface } from './../../adapter/types/merchant-request.interface';
import { User } from "./../../core/entity/user";

export interface MerchantRepositoryInterface {
  listAll(): Promise<Merchant[]>;
  findById(merchantId: string): Promise<Merchant | null>;
  create(entity: Merchant): Promise<Merchant>;
  update(entity: Merchant, merchantId: string): Promise<Merchant | null>;
  delete(merchant: Merchant): Promise<void | any>
}

