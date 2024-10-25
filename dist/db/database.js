"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_connect = db_connect;
const mongoose_1 = __importDefault(require("mongoose"));
function db_connect(db_uri) {
    try {
        mongoose_1.default.connect(db_uri);
        console.log("Connected to database");
    }
    catch (err) {
        console.log(err);
    }
}
