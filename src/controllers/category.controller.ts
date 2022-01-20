import { Request,Response } from "express";
import { createCategory, getCategory,getCategorys, updateCategory } from "../db/category";
import Category from "../models/category.model";


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
        const data=await getCategorys();
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
        const {image,name,description}=req.body;
       
        const newCategory:Category={
            image,
            name,
            description
        }
        const result=await createCategory(newCategory);
        if(!result){
            return res.status(500).json({
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
        const {image,name,description}=req.body;
       
        const uCategory:Category={
            image,
            name,
            description
        }
        const result=await updateCategory(Number(id),uCategory);
        if(!result){
            return res.status(500).json({
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

