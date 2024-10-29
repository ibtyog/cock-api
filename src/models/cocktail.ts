import mongoose from "mongoose";

const cocktailSchema = new mongoose.Schema({
    "name": {type : String, required: true},
    "category": {type : String, required: true},
    "instruction": {type : String, required: true},
    "ingredients":
    {
        type : [
        {
            ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ingredient' },
            quantity: String
        }
    ],
    required: true
    }
});

export const cocktail = mongoose.model("cocktail", cocktailSchema);