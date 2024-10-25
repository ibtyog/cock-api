"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = getAll;
exports.add = add;
const cocktail_1 = require("../models/cocktail");
async function getAll(req, res) {
    try {
        const allCocktails = await cocktail_1.cocktail.find();
        res.status(200).json(allCocktails);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send("API error");
        return;
    }
}
async function add(req, res) {
    try {
        const newCocktail = new cocktail_1.cocktail(req.body);
        await newCocktail.save();
        res.status(201).json(newCocktail);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send("API error");
        return;
    }
}
;
