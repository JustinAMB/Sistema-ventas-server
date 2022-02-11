import { Request, Response } from "express";
import { getPersonEmail } from "../db/person";
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

export const emailValidator = async (req:Request, res:Response, next:Function) => {
    try {
        const kind=req.params["kind"] as unknown as number;
        const { email}  = req.body;
        const person= await getPersonEmail(email,kind);
      
      
        if (!person) {
          next();
          return;
        }
      const message:string=kind===1?"Este correo ya esta registrado como proveedor":"Este correo ya esta registrado como cliente";
  
      return res.status(404).json({ ok:false,message });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ ok:false,message: error });
    }
};