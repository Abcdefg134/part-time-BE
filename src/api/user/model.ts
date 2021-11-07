import {Schema, model} from 'mongoose';

type Role = 'admin' | 'user';
type Gender = 'male' | 'female' | '';

export interface User {
    username: string;
    email: string;
    hash: string;
    salt: string;
    role: Role;
    phone?: string;
    photoUrl?: string;
    displayName?: string;
    gender?: Gender;
    dob?: Date;
    address?: {
        city?: string;
        district?: string;
        ward?: string;
        detail?: string;
    }
}

const schema = new Schema<User>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    role: {type: String, default: 'user'},
    phone: {type: String, default: ''},
    photoUrl: {type: String, default: ''},
    displayName: {type: String, default: ''},
    gender: {type: String, default: ''},
    dob: {type: Date, default: new Date(+new Date() + 7*24*60*60*1000)},
    address: {
        city: {type: String, default: ''},
        district: {type: String, default: ''},
        ward: {type: String, default: ''},
        detail: {type: String, default: ''},
    }
});

export const Model = model('User', schema);