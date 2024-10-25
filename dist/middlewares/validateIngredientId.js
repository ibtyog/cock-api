"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIngredientId = validateIngredientId;
const ingredients_1 = require("../models/ingredients");
async function validateIngredientId(req, res, next) {
    const allReqIngredients = req.body.ingredients;
    console.log(allReqIngredients);
    try {
        for (var id in allReqIngredients) {
            const ingredientId = allReqIngredients[id].ingredient_id;
            const valIngredient = await ingredients_1.ingredient.findById(ingredientId);
            if (!valIngredient) {
                res.status(400).send(`Ingredient id ${ingredientId} is invalid.`);
                return;
            }
        }
    }
    catch (err) {
        res.status(400).send("Invalid request");
        return;
    }
    next();
}
