import { Document, Schema, model } from 'mongoose';

import { RoleType } from './../../adapter/enums';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  cpf: string;
  is_active: boolean;
  roles: RoleType;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
  roles: {
    type: String,
    required: true,
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const UserModel = model<User>('User', UserSchema);
