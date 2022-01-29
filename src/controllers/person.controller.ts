import { Request,Response } from "express";
import { createPerson, getPerson, getPersons, updatePerson } from "../db/person";
import Person from "../models/person.model";




export const getPersonById=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const data=await getPerson(Number(id));
        

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

export const addPerson=async(req:Request,res:Response)=>{
   
    try{
        const {kind}=req.params;
        const {name,email,lastname,address,phone}=req.body;
        const newPerson:Person={
            name,email,lastname,address,phone
        }
        const {exito}=await createPerson(Number(kind),newPerson);
        if(!exito){
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


export  const updatePersonById=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {name,email,lastname,address,phone}=req.body;
        const uPerson:Person={
            name,email,lastname,address,phone}

        const {exito}=await updatePerson(Number(id),uPerson);
        if(!exito){
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