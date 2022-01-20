import { Request,Response } from "express";
import { createPerson, getPerson, getPersons, updatePerson } from "../db/person";
import Person from "../models/person.model";




export const getPersonById=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const data=await getPerson(Number(id));
        if(!data){
            return res.status(400).json({
                ok:false,
                message:'Person not found'
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

export const getAllPerson=async(req:Request,res:Response)=>{
    try{
        const {kind}=req.params;
        const data=await getPersons(Number(kind));
        
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

export const addPerson=(req:Request,res:Response)=>{
   
    try{
        const {kind}=req.params;
        const {name,email,lastname,address,phone}=req.body;
        const newPerson:Person={
            name,email,lastname,address,phone
        }
        const result=createPerson(Number(kind),newPerson);
        if(!result){
            return res.status(500).json({
                ok:false,
                message:'Person not created'
            });
        }
        return res.status(201).json({
            ok:true,
            message:'Person  created'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }

} 


export  const updatePersonById=(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {name,email,lastname,address,phone}=req.body;
        const uPerson:Person={
            name,email,lastname,address,phone}

        const result=updatePerson(Number(id),uPerson);
        if(!result){
            return res.status(500).json({
                ok:false,
                message:'Person not updated'
            });
        }
        return res.status(201).json({
            ok:true,
            message:'Person  updated'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}