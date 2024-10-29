import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    "name": {type: String, required: true},
    "description": {type: String, required: true},
    "isAlcohol": {type: Boolean, required: true},
    "image_url": {type: String, required: true},
}, {collection: "ingredients"});

export const ingredient = mongoose.model("ingredient", ingredientSchema)

