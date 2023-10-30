import { Document, Schema, model } from 'mongoose';

import { Merchant } from '../../merchants/models/merchant';

export interface Catalog extends Document {
    name: string;
    description: string;
    merchant_id: Merchant;
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
    merchant_id: {
        type: Schema.Types.ObjectId,
        red: 'Merchant',
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
});

export const CatalogModel = model<Catalog>('Catalog', CatalogSchema);
