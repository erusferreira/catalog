import { Document, Schema, model } from 'mongoose';

import { Merchant } from './../../core/entity/merchant';

export interface Catalog extends Document {
  name: string;
  description: string;
  merchant: Merchant;
  create_at: Date;
  update_at: Date;
  is_active: boolean;
}

const CatalogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}
);

export const CatalogModel = model<Catalog>('Catalog', CatalogSchema);
