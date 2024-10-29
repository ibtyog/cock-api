import express from 'express';
import cocktailRouter from './routes/cocktail';
import ingredientRouter from './routes/ingredient';
import { db_connect } from './db/database';

const app = express();

const API_URL = "http://localhost"; // your domain address
const PORT = 3000; // port for your api


db_connect("mongodb://localhost:27017/cock-api-db");
app.use(express.json());

app.use(ingredientRouter);
app.use(cocktailRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${API_URL}:${PORT}`); 
});