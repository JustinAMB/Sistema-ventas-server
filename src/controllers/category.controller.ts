import { Request,Response } from "express";
import { activeCategory } from "./../db/category";
import { createCategory, getCategory,getCategorys, updateCategory } from "../db/category";
import Category from "../models/category.model";
import { convertBoolean } from '../helpers/stringBool';

export const getCategoryById= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const data=await getCategory(Number(id));
        if(!data){
            return res.status(400).json({
                ok:false,
                message:'Category not found'
            });
        }
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}

export const getAllCategory= async(req:Request,res:Response)=>{
    try{
        const state=req.query["state"] as string;
        const data=await getCategorys(convertBoolean(state))  || [];
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}

export const addCategory= async(req:Request,res:Response)=>{
    try{
        const {name}=req.body;
       
        const newCategory:Category={
            
            name,
            
        }
        const {exito}=await createCategory(newCategory) ;
        
        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Category not created'
            });
        }

        return res.status(200).json({
            ok:true,
            message:'Category created'
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}
export const updateCategoryById= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {name,}=req.body;
       
        const uCategory:Category={
            
            name,
        
        }
        const {exito}=await updateCategory(Number(id),uCategory);
        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Category not updated'
            });
        }

        return res.status(200).json({
            ok:true,
            message:'Category updated'
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}

export const activeCategoryById= async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {state}=req.body;
       
        
        const {exito}=await activeCategory(Number(id),convertBoolean(state));
        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Category not actived'
            });
        }

        return res.status(201).json({
            ok:true,
            message:'Category actived'
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}



