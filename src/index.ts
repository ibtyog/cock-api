import express from 'express';
import cocktailRouter from './routes/cocktail';
import ingredientRouter from './routes/ingredient';
import { db_connect } from './db/database';
// require('dotenv').config();

const app = express();

const API_URL = "http://localhost"; // your domain address
const PORT = 3000; // port for your api
const DB_URI = process.env.DB_URL;
// add DB_URI in ./.env
db_connect(DB_URI);
app.use(express.json());

app.use(ingredientRouter);
app.use(cocktailRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${API_URL}:${PORT}`); 
});