import { Merchant } from '@core/entity/merchant';
import { MerchantRequestInterface } from '@adapter/types/merchant-request.interface';

export class MerchantMapper {
  
  public static merchantCreateToDomain(merchantRequest: MerchantRequestInterface) {
    const merchant = {
      name: merchantRequest.name,
      cnpj: merchantRequest.cnpj,
      is_active: true
    };
    return merchant as Merchant
  }
  
  public static merchantUpdateToDomain(merchantRequest: MerchantRequestInterface) {
    const merchant = {
      name: merchantRequest.name,
      cnpj: merchantRequest.cnpj,
      is_active: merchantRequest.is_active
    };
    return merchant as Merchant
  }

  public static toDTO(merchant: Merchant) {
    const result = {
      id: merchant._id.toString(),
      name: merchant.name,
      cnpj: merchant.cnpj,
      is_active: merchant.is_active
    }
    return result;
  }
}
