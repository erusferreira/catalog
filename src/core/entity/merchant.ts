import { Document, Schema, model } from 'mongoose';

export interface Merchant extends Document {
  name: string;
  cnpj: string;
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
