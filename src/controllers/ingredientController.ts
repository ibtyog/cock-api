import { Request, Response } from "express";
import { ingredient } from "../models/ingredients";

export async function addIngredient(req:Request, res:Response) {
    try {
        const newIngredient = new ingredient(req.body)
        await newIngredient.save();

        const responseJson = {
            "id" : newIngredient.id,
            "name" : req.body.name,
            "description" : req.body.description,
            "isAlcohol" : req.body.isAlcohol,
            "image_url" : req.body.image_url
        }

        res.status(201).json(responseJson)
        return;

    } catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;        
    }
};

export async function getAll(req:Request, res:Response) {
    try {
        const allIngredients = await ingredient.find();

        const ingredientsList = [];

        for (const i in allIngredients) {
            ingredientsList.push({
                "id" : allIngredients[i].id,
                "name" : allIngredients[i].name,
                "description" : allIngredients[i].description,
                "is_alcohol" : allIngredients[i].isAlcohol,
                "image_url" : allIngredients[i].image_url
            });
        }

        res.status(200).send(ingredientsList);
        return;
    } catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;        
    }
}

export async function getById(req:Request, res:Response) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredient.findById(ingID);
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`)
            return;
        }

        const responseJson = {
            "id" : req.params.id,
            "name" : ingredientById.name,
            "description" : ingredientById.description,
            "is_alcohol" : ingredientById.isAlcohol,
            "image_url" : ingredientById.image_url
        }

        res.status(200).json(responseJson);
        return;
    } catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
    }
};

export async function update(req:Request, res:Response) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredient.findByIdAndUpdate(ingID, req.body, {new: true});
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        await ingredientById.save();

        const responseJson = {
            "id" : ingID,
            "name" : ingredientById.name,
            "description" : ingredientById.description,
            "is_alcohol" : ingredientById.isAlcohol,
            "image_url" : ingredientById.image_url
        }

        res.status(200).send(responseJson);
        return;
    } catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
    }
};

export async function remove(req:Request, res:Response) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredient.findByIdAndDelete(ingID);
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        res.status(200).send("Resource deleted successfully.")
        return;
    } catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
    }
}