import { injectable } from 'tsyringe';

import { Merchant, MerchantModel } from '@core/entity/merchant';
import { MerchantRepositoryInterface } from '@core/repository/merchant-repository.interface';
import { MerchantRequestInterface } from '@adapter/types/merchant-request.interface';
import { User } from '@core/entity/user';

@injectable()
export class MerchantRepository implements MerchantRepositoryInterface {
 
  private modelMerchant = MerchantModel;
  
  public async listAll(): Promise<Merchant[]> {
    return await this.modelMerchant.find();
  }

  public async listAllByOwner(ownerId: string): Promise<Merchant[]> {
    return await this.modelMerchant.find({ owner: ownerId }).exec();
  }

  public async findById(merchantId: string): Promise<Merchant | null> {
    return await this.modelMerchant.findById(merchantId);
  }

  public async create(merchant: Merchant): Promise<Merchant> {
    const newMerchant = new this.modelMerchant(merchant);
    return await newMerchant.save();
  }

  public async update(entity: Merchant, merchantId: string): Promise<Merchant | null> {
    return await this.modelMerchant.findByIdAndUpdate(merchantId, entity, {
      new: true,
      runValidators: true
    });
  }

  public async delete(merchant: Merchant): Promise<void | any> {
    const merchantToDelete = await this.findById(merchant.id);
    return merchantToDelete?.deleteOne();
  }
  
}
