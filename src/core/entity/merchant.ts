import { Document, Schema, model } from 'mongoose';

import { User } from './user';
export interface Merchant extends Document {
  name: string;
  cnpj: string;
  owner: User;
  create_at: Date;
  update_at: Date;
  is_active: boolean;
}

const MerchantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const MerchantModel = model<Merchant>('Merchant', MerchantSchema);
