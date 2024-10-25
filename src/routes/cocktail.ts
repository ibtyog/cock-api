import { Router, Request, Response } from 'express';
import { add, getAll } from '../controllers/cocktailController';
import { validateIngredientId } from '../middlewares/validateIngredientId';
const cocktailRouter = Router();

// cocktailRouter.get('/cocktails/getAll', getAll);

cocktailRouter.get('/cocktails/getAll', getAll)

cocktailRouter.post('/cocktails/add',validateIngredientId, add);

export default cocktailRouter;