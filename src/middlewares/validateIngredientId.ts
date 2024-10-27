import { Request, Response, NextFunction } from "express";
import { ingredient } from "../models/ingredients";
export async function validateIngredientId(req:Request, res:Response, next:NextFunction) {
    const allReqIngredients = req.body.ingredients;
    // console.log(allReqIngredients);
    try {
        for (var id in allReqIngredients) {
            const ingredientId = allReqIngredients[id].ingredient_id;
            const valIngredient = await ingredient.findById(ingredientId);
            if (!valIngredient) {
                res.status(400).send(`Ingredient id ${ingredientId} is invalid.`)
                return;
            }
        }
    } catch (err) {
        res.status(400).send("Invalid request")
        return;
    }
    
    next();
}