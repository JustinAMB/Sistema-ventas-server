import {Response,Request} from 'express';
import { activeProduct, createProduct, getProduct, getProducts, updateProduct } from '../db/product';
import Product from '../models/product.model';




export const getProductById=async(req:Request,res:Response)=>{

    try{
        const {id}=req.params;
        const data=await getProduct(Number(id));
        if(!data){
            return res.status(401).json({
                ok:false,
                message:'Product not found'
            });
        }
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
        const {is_active} = req.query;
        const data=await getProducts(Boolean(is_active)) ||[];
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
        const {is_active} = req.query;
        const data=await getProduct(Number(id));
        if(!data){
            return res.status(401).json({
                ok:false,
                message:'Product not found'
            });
        }
        const result=await activeProduct(Number(id),Boolean(is_active));
        if(!result){
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










export const updateProductbyId=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {name,description,price,barcode,unit,category,inventary,inventary_min,image}=req.body;
        const uProduct:Product={
            name,description,price,barcode,unit,category,inventary,inventary_min,image
        }
        const data=await getProduct(Number(id));
        if(!data){
            return res.status(401).json({
                ok:false,
                message:'Product not found'
            });
        }
        const result=await updateProduct(Number(id),uProduct);
        if(!result){
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
        const {name,description,price,barcode,unit,category,inventary,inventary_min,image}=req.body;
        const newProduct:Product={
            name,description,price,barcode,unit,category,inventary,inventary_min,image
        }
        
        const result=await createProduct(newProduct);
        if(!result){
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