import {Response,Request} from 'express';
import { activeProduct, createProduct, getProduct, getProducts, searchInventary, updateProduct } from '../db/product';
import { convertBoolean } from '../helpers/stringBool';
import Product from '../models/product.model';




export const getProductById=async(req:Request,res:Response)=>{

    try{
        const {id}=req.params;
        const data=await getProduct(Number(id));
        
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}


export const getAllProduct=async(req:Request,res:Response)=>{

    try{
        const is_active = req.query['is_active'] as string; 
        const data=await getProducts(convertBoolean(is_active)) ||[];
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}



export const searchInventaryByTerm=async(req:Request,res:Response)=>{

    try{
        const term = req.query['term'] as string  || ''; 
        const data=await searchInventary(term) ||[];
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}



export const activeProductbyId=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const is_active = req.query['is_active'] as string;
        
        const {exito}=await activeProduct(Number(id),convertBoolean(is_active));
        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Product not active'
            });
        }
        return res.status(200).json({
            ok:true,
            message:'Product active'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}










export const updateProductById=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {name,price,barcode,unit,category,inventary_min,image}=req.body;
        const uProduct:Product={
            name,price,barcode,unit,category,inventary_min,image
        }
        
        const {exito}=await updateProduct(Number(id),uProduct);
        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Product not updated'
            });
        }
        return res.status(200).json({
            ok:true,
            message:'Product updated'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}


export const addProduct=async(req:Request,res:Response)=>{
    try{
        const {name,price,barcode,unit,category,inventary_min,image}=req.body;
        const newProduct:Product={
            name,price,barcode,unit,category,inventary_min,image
        }
        
        const {exito}=await createProduct(newProduct);
        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Product not created'
            });
        }
        return res.status(201).json({
            ok:true,
            message:'Product created'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}