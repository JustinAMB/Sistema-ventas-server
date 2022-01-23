import { Request, Response } from "express";
import { getCategory } from "../db/category";
import { getProduct } from "../db/product";

export const verifyIdProduct = async (req:Request, res:Response, next:Function) => {
    try {
        const { id } = req.params;
        const product = await getProduct(Number(id));
      
      
        if (!product) {
            return res.status(403).json({ 
                ok: false,
                message: 'Product not found.'
          });
        }
        next();
  
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({ ok:false,message: error });
    }
};


export const verifyIdCategory = async (req:Request, res:Response, next:Function) => {
    try {
        const { id } = req.params;
        const category = await getCategory(Number(id));
      
      
        if (!category) {
            return res.status(403).json({ 
                ok: false,
                message: 'category not found.'
          });
        }
        next();
  
      
    } catch (error) {
      console.log(error);
      return res.status(500).send({ ok:false,message: error });
    }
};