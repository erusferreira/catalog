import { Schema, Document, model } from 'mongoose';

export interface Manufacturer extends Document {
    name: string;
    cnpj: string;
    is_active: boolean;
    create_at: Date;
    update_at: Date;
}

const manufacturerSchema = new Schema({
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
    }
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

export const ManufacturerModel = model<Manufacturer>('Manufacturer', manufacturerSchema)