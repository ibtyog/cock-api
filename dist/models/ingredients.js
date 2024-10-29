"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ingredientSchema = new mongoose_1.default.Schema({
    "name": { type: String, required: true },
    "description": { type: String, required: true },
    "isAlcohol": { type: Boolean, required: true },
    "image_url": { type: String, required: true },
}, { collection: "ingredients" });
exports.ingredient = mongoose_1.default.model("ingredient", ingredientSchema);
