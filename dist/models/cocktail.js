"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocktail = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cocktailSchema = new mongoose_1.default.Schema({
    "name": String,
    "category": String,
    "instruction": String,
    "ingredients": [
        {
            ingredient_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ingredient' },
            quantity: String
        }
    ]
});
exports.cocktail = mongoose_1.default.model("cocktail", cocktailSchema);
