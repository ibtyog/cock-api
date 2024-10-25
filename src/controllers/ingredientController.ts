import { Request, Response } from "express";
import { ingredient } from "../models/ingredients";

export async function addIngredient(req:Request, res:Response) {
    try {
        const newIngredient = new ingredient(req.body)
        await newIngredient.save();
        res.status(201).json(newIngredient)
        return;
    } catch (err) {
        console.log(err);
        res.send(400).send("POST Error");
        return;        
    }
};

export async function getAll(req:Request, res:Response) {
    try {
        const allIngredients = await ingredient.find();
        res.status(200).send(allIngredients);
        return;
    } catch (err) {
        console.log(err);
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
        res.status(200).json(ingredientById);
        return;
    } catch (err) {
        console.log(err);
        return;
    }
};

export async function update(req:Request, res:Response) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredient.findByIdAndUpdate(ingID, req.body);
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        await ingredientById.save();
        res.status(200).json(ingredientById);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).send("API Error")
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
        res.status(400).send("API error");
        return;
    }
}