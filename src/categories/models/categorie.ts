import { Document, Schema, model } from 'mongoose';

import { Catalog } from '../../catalogs/models/catalog';

export interface Category extends Document {
    name: string;
    description: string;
    create_at: Date;
    update_at: Date;
    is_active: boolean;
    catalog_id: Catalog;
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
    catalog_id: {
        type: Schema.Types.ObjectId,
        red: 'Catalog',
        required: true
    },
});

export const CategoryModel = model<Category>('Category', CategorySchema);
