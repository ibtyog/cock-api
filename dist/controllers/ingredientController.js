"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIngredient = addIngredient;
exports.getAll = getAll;
exports.getById = getById;
exports.update = update;
exports.remove = remove;
const ingredients_1 = require("../models/ingredients");
async function addIngredient(req, res) {
    try {
        const newIngredient = new ingredients_1.ingredient(req.body);
        await newIngredient.save();
        res.status(201).json(newIngredient);
        return;
    }
    catch (err) {
        console.log(err);
        res.send(400).send("POST Error");
        return;
    }
}
;
async function getAll(req, res) {
    try {
        const allIngredients = await ingredients_1.ingredient.find();
        res.status(200).send(allIngredients);
        return;
    }
    catch (err) {
        console.log(err);
        return;
    }
}
async function getById(req, res) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredients_1.ingredient.findById(ingID);
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        res.status(200).json(ingredientById);
        return;
    }
    catch (err) {
        console.log(err);
        return;
    }
}
;
async function update(req, res) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredients_1.ingredient.findByIdAndUpdate(ingID, req.body);
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        await ingredientById.save();
        res.status(200).json(ingredientById);
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send("API Error");
    }
}
;
async function remove(req, res) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredients_1.ingredient.findByIdAndDelete(ingID);
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        res.status(200).send("Resource deleted successfully.");
        return;
    }
    catch (err) {
        console.log(err);
        res.status(400).send("API error");
        return;
    }
}
