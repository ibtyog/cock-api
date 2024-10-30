"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cocktail_1 = __importDefault(require("./routes/cocktail"));
const ingredient_1 = __importDefault(require("./routes/ingredient"));
const database_1 = require("./db/database");
require('dotenv').config();
const app = (0, express_1.default)();
const API_URL = "http://localhost"; // your domain address
const PORT = 3000; // port for your api
const DB_URI = process.env.DB_URL;
(0, database_1.db_connect)(DB_URI);
app.use(express_1.default.json());
app.use(ingredient_1.default);
app.use(cocktail_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${API_URL}:${PORT}`);
});
