import { Request,Response } from "express";
import { createSellDetail } from "../db/dellDetail";
import { createSell } from "../db/sell";
import Sell from "../models/sell.model";
import SellDetail from "../models/sellDetail.model";


export const addSell=async(req:Request,res:Response)=>{
    try{
        //create sell
        const {person,created,total,user}=req.body;
        const detailsReq=req.body.details as Array<any>;
        const newSell:Sell={
            person,
            created,
            user,
            total  
        }
        const result=await createSell(newSell);
        if(!result){
            return res.status(401).json({
                ok:false,
                message:'Sell not created'
            });
        }

        const details=detailsReq.map((detail)=>{
            return {
                ...detail,
                sell:result.exito
            }
        }) as SellDetail[];
        details.forEach(async(detail,index)=>{
            const result=await createSellDetail(detail);
            if(!result){
                return res.status(401).json({
                    ok:false,
                    message:'Sell not created'
                });
            }
            details[index].id=result.exito;
        })
        newSell.id=result.exito;
        return res.status(200).json({
            ok:true,
            message:'Sell created',
            data:{
                sell:newSell,
                details
            }
        });

    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}