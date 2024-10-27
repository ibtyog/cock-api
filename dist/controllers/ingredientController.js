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
        const responseJson = {
            "id": newIngredient.id,
            "name": req.body.name,
            "description": req.body.description,
            "isAlcohol": req.body.isAlcohol,
            "image_url": req.body.image_url
        };
        res.status(201).json(responseJson);
        return;
    }
    catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
    }
}
;
async function getAll(req, res) {
    try {
        const allIngredients = await ingredients_1.ingredient.find();
        const ingredientsList = [];
        for (const i in allIngredients) {
            ingredientsList.push({
                "id": allIngredients[i].id,
                "name": allIngredients[i].name,
                "description": allIngredients[i].description,
                "is_alcohol": allIngredients[i].isAlcohol,
                "image_url": allIngredients[i].image_url
            });
        }
        res.status(200).send(ingredientsList);
        return;
    }
    catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
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
        const responseJson = {
            "id": req.params.id,
            "name": ingredientById.name,
            "description": ingredientById.description,
            "is_alcohol": ingredientById.isAlcohol,
            "image_url": ingredientById.image_url
        };
        res.status(200).json(responseJson);
        return;
    }
    catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
    }
}
;
async function update(req, res) {
    const ingID = req.params.id;
    try {
        const ingredientById = await ingredients_1.ingredient.findByIdAndUpdate(ingID, req.body, { new: true });
        if (!ingredientById) {
            res.status(404).send(`Resource with ${ingID} was not found.`);
            return;
        }
        await ingredientById.save();
        const responseJson = {
            "id": ingID,
            "name": ingredientById.name,
            "description": ingredientById.description,
            "is_alcohol": ingredientById.isAlcohol,
            "image_url": ingredientById.image_url
        };
        res.status(200).send(responseJson);
        return;
    }
    catch (err) {
        console.log(err);
        res.send(400).send("Bad request.");
        return;
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
        res.send(400).send("Bad request.");
        return;
    }
}
