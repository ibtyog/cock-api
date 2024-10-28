import { Router, Request, Response } from 'express';
import { getAll, addIngredient, getById, update, remove } from '../controllers/ingredientController';
import { test_middleware } from '../middlewares/test';
const ingredientRouter = Router();


ingredientRouter.get('/ingredients/getAll', getAll);
ingredientRouter.get('/ingredients/get/:id', getById);

ingredientRouter.post('/ingredients/add', addIngredient);

ingredientRouter.put('/ingredients/update/:id', update);

ingredientRouter.delete('/ingredients/delete/:id', remove)

export default ingredientRouter;