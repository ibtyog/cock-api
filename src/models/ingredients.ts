import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    "name": String,
    "description": String,
    "isAlcohol": Boolean,
    "image_url": String,
}, {collection: "ingredients"});

export const ingredient = mongoose.model("ingredient", ingredientSchema)

