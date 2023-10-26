import {Schema, model} from "mongoose";

const articleSchema = new Schema({
    title: {type: String, required: true},
    description: {type:String},
    link: {type: String, required: true},
});

export default model('Article', articleSchema);