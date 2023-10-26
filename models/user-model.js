import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: {required: true, unique: true, type: String},
    name: {type: String},
    password: {required: true, type: String},
    roles: {type: Schema.Types.Array, default: ['USER']},
});

export default model('User', UserSchema);
