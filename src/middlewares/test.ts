import { Response, Request, NextFunction, json } from "express";


export function test_middleware(req:Request, res:Response, next:NextFunction) {
    console.log("this is middleware");
    next();
};