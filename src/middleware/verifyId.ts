import { Request, Response } from "express";
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