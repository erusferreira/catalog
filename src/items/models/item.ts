import { Document, Schema, model } from 'mongoose';

import { Category } from '../../categories/models/categorie';
import { Product } from '../../products/models/product';

export interface Item extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    create_at: Date;
    update_at: Date;
    is_active: boolean;
    category_id: Category;
    product_id: Product;
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
    category_id: {
        type: Schema.Types.ObjectId,
        red: 'Category',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        red: 'Product',
        required: true
    }
});

export const ItemModel = model<Item>('Item', ItemSchema);
