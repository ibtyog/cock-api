import { Request, Response } from "express";
import { cocktail } from "../models/cocktail";



export async function getAll(req:Request, res:Response) {
    try {
        const allCocktails = await cocktail.find();
        res.status(200).json(allCocktails);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).send("API error");
        return;
    }
}

export async function add(req:Request, res:Response) {
    try {
        const newCocktail = new cocktail(req.body)
        await newCocktail.save();
        res.status(201).json(newCocktail);
        return;
    } catch (err){
        console.log(err);
        res.status(400).send("API error");
        return;
    }
};
