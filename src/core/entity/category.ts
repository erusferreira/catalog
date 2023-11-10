import { Document, Schema, model } from 'mongoose';

import { Catalog } from './catalog';

export interface Category extends Document {
  name: string;
  description: string;
  create_at: Date;
  update_at: Date;
  is_active: boolean;
  catalog: Catalog;
}

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
  catalog: {
    type: Schema.Types.ObjectId,
    ref: 'Catalog',
    required: true
  },
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const CategoryModel = model<Category>('Category', CategorySchema);
