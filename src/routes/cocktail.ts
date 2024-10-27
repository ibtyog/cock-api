import { Router, Request, Response } from 'express';
import { add, get, getAll, remove, update } from '../controllers/cocktailController';
import { validateIngredientId } from '../middlewares/validateIngredientId';
const cocktailRouter = Router();

// cocktailRouter.get('/cocktails/getAll', getAll);

cocktailRouter.get('/cocktails/getAll', getAll);
cocktailRouter.get('/cocktails/get/:id', get);


cocktailRouter.post('/cocktails/add',validateIngredientId, add);

cocktailRouter.put('/cocktails/update/:id', validateIngredientId, update);

cocktailRouter.delete('/cocktails/delete/:id', remove);

export default cocktailRouter;