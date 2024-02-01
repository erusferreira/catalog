import { Document, Schema, model } from 'mongoose';

import { Category } from './category';
import { Product } from './../../core/entity/product';

export interface Item extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  create_at: Date;
  update_at: Date;
  is_active: boolean;
  category: Category;
  product: Product;
}

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
},{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const ItemModel = model<Item>('Item', ItemSchema);
