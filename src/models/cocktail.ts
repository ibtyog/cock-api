import mongoose from "mongoose";

const cocktailSchema = new mongoose.Schema({
    "name": String,
    "category": String,
    "instruction": String,
    "ingredients":[
        {
            ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ingredient' },
            quantity: String
        }
    ]
});

export const cocktail = mongoose.model("cocktail", cocktailSchema);