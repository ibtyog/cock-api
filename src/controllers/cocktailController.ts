import { Request, response, Response } from "express";
import { cocktail } from "../models/cocktail";
import { ingredient } from "../models/ingredients";



export async function getAll(req:Request, res:Response) {
    try {
        const allCocktails = await cocktail.find();

        const responseList = []

        for (const i in allCocktails) {
            const ingredientsList = []

            for (const j in allCocktails[i].ingredients) {
                const ingredientId = allCocktails[i].ingredients[j].ingredient_id;
                const current_ingredient = await ingredient.findById(ingredientId); 
                let ingredientName: string | null | undefined = "missing";
                if (current_ingredient) {
                    ingredientName = current_ingredient.name;
                }
                
                const ingredientsJson = {
                    "ingredient_id" : ingredientId,
                    "name" : ingredientName,
                    "quantity" : allCocktails[i].ingredients[j].quantity
                };
                ingredientsList.push(ingredientsJson);
            }
            const cocktailJson = {
                "id" : allCocktails[i].id,
                "name" : allCocktails[i].name,
                "category" : allCocktails[i].category,
                "instruction" : allCocktails[i].instruction,
                "ingredients" : ingredientsList
            }
            responseList.push(cocktailJson);
        }


        res.status(200).send(responseList);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request.");
        return;
    }
}

export async function get(req: Request, res: Response) {
    try {
        const cocktailId = req.params.id;
        const fetchedCocktail = await cocktail.findById(cocktailId);
        
        if (!fetchedCocktail) {
            res.status(404).send(`Cocktail with id ${cocktailId} was not found.`)
            return;
        }

        const ingredientsList = []

        for (const i in fetchedCocktail.ingredients) {
            const ingredientName = await ingredient.findById(fetchedCocktail.ingredients[i].ingredient_id);
            if (!ingredientName) {
                ingredientsList.push({
                    "ingredient_id" : "missing",
                    "name" : "missing",
                    "quantity" : fetchedCocktail.ingredients[i].quantity });
                continue;
            }
            ingredientsList.push({
                "ingredient_id" : ingredientName.id,
                "name" : ingredientName.name,
                "quantity" : fetchedCocktail.ingredients[i].quantity });  
        }

        const responseJson = {
            "id" : cocktailId,
            "name" : fetchedCocktail.name,
            "category" : fetchedCocktail.category,
            "instructions" : fetchedCocktail.instruction,
            "ingredients" : ingredientsList
        }
        res.status(200).json(responseJson);
        return;

    } catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
    }
}

export async function add(req:Request, res:Response) {
    try {
        const newCocktail = new cocktail(req.body)
        await newCocktail.save();
        const ingredientsList = [];

        for (const i in newCocktail.ingredients) {
            let ingredientName: string | null | undefined = "."; // possibly null :c - handled by middleware 
            
            const fetchIngredient = await ingredient.findById(newCocktail.ingredients[i].ingredient_id);
            
            
            if (fetchIngredient) {
                ingredientName = fetchIngredient.name;
            }
            ingredientsList.push ({
                "ingredient_id" : newCocktail.ingredients[i].id,
                "name" : ingredientName,
                "quantity" : req.body.ingredients[i].quantity
            });
        }

        const responseJson = {
            "id" : newCocktail.id,
            "name" : newCocktail.name,
            "category" : newCocktail.category,
            "instructions" : newCocktail.instruction,
            "ingredients" : ingredientsList
        }

        res.status(201).json(responseJson);
        return;
    } catch (err){
        console.log(err);
        res.status(400).send("Bad request.");
        return;
    }
};

export async function update(req: Request, res: Response) {
    try {
        const cocktailId = req.params.id;
        const cocktailToUpdate = await cocktail.findByIdAndUpdate(cocktailId, req.body, {new: true});
        if (!cocktailToUpdate) {
            res.status(404).send(`Cocktail with id ${cocktailId} was not found.`);
            return;
        }

        const ingredientsList = []

        for (const i in cocktailToUpdate.ingredients) {
            const ingredientId = cocktailToUpdate.ingredients[i].ingredient_id;
            const current_ingredient = await ingredient.findById(ingredientId);
            let ingredientName: string | null | undefined = "missing";
            if (current_ingredient) {
                ingredientName = current_ingredient.name
            }
            ingredientsList.push({
                "ingredient_id" : ingredientId,
                "name" : ingredientName,
                "quantity" : cocktailToUpdate.ingredients[i].quantity
            });
        }

        const responseJson = {
            "id" : cocktailId,
            "name" : cocktailToUpdate.name,
            "category" : cocktailToUpdate.category,
            "instruction" : cocktailToUpdate.instruction,
            "ingredients" : ingredientsList
        };
        res.status(200).send(responseJson);
        return;

    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request.")
    }
}

export async function remove(req: Request, res:Response) {
    try {
        const cocktailId = req.params.id;
        const cocktailToDelete = await cocktail.findByIdAndDelete(cocktailId);
        if (!cocktailToDelete) {
            res.status(404).send(`Cocktail with ID ${cocktailId} was not found.`);
            return;
        }
        res.status(200).send("Resource deleted successfully.")
        return;
    } catch (err) {
        console.log(err);
        res.status(400).send("Bad request.")
        return;
    }
}