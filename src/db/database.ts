import mongoose from "mongoose";

export function db_connect(db_uri: string){
    try {
        mongoose.connect(db_uri)
        console.log("Connected to database");  
    } catch (err) {
        console.log(err);
    }
} 
