import { Merchant } from "@core/entity/merchant";
import { MerchantRequestInterface } from '@adapter/types/merchant-request.interface';

export interface MerchantRepositoryInterface {
  listAll(): Promise<Merchant[]>;
  findById(merchantId: string): Promise<Merchant | null>;
  create(entity: MerchantRequestInterface): Promise<Merchant>;
  update(entity: MerchantRequestInterface, merchantId: string): Promise<Merchant | null>;
  delete(merchant: Merchant): Promise<void | any>
}

