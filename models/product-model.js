import {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    // photoPath: {type: String},
    description: {type: String, required: true},
    category: {type: String},
    amount: {type: Number, required: true},
    seller: {type: Schema.Types.ObjectId, ref: "User"},
    trigger: {type: Schema.Types.Array}
});

export default model("Product", productSchema);