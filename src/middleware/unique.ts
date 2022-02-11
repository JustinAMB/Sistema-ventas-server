import { Request, Response } from "express";
import { getProductBarcode } from "./../db/product";

export const barcodeValidator = async (req:Request, res:Response, next:Function) => {
    try {
       
        const { barcode } = req.body;
      
      const product = await getProductBarcode(barcode);
      
      
        if (!product) {
          next();
          return;
        }
      
  
      return res.status(404).json({ ok:false,message: "Este codigo de barras ya esta registrado" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ ok:false,message: error });
    }
};