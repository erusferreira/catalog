import { injectable } from 'tsyringe';
import { Merchant, MerchantModel } from '../../core/entity/merchant';
import { MerchantRepositoryInterface } from '../../core/repository/merchant-repository.interface';
import { MerchantRequestInterface } from '../types/merchant-request.interface';

@injectable()
export class MerchantRepository implements MerchantRepositoryInterface {
 
  private modelMerchant = MerchantModel;
  
  public async listAll(): Promise<Merchant[]> {
    return await this.modelMerchant.find();
  }

  public async findById(merchantId: string): Promise<Merchant | null> {
    return await this.modelMerchant.findById(merchantId);
  }

  public async create(merchant: MerchantRequestInterface): Promise<Merchant> {
    const newMerchant = new this.modelMerchant(merchant);
    return await newMerchant.save();
  }

  public async update(entity: MerchantRequestInterface): Promise<Merchant> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
}
