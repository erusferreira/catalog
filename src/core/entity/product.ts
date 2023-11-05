import { Schema, Document, model } from 'mongoose';

import { Manufacturer } from '../entity/manufacturer';

export interface Product extends Document {
  name: string;
  description: string;
  ean_code: string;
  unit_measurement: string;
  is_active: boolean;
  manufaturer_id: Manufacturer;
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ean_code: {
    type: String,
    required: true
  },
  unit_measurement: {
    type: String,
    required: true
  },
  is_active:{
    type: Boolean,
    required: true
  },
  manufaturer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

export const ProductModel = model<Product>('Product', ProductSchema);
