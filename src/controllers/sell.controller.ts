import { Request,Response } from "express";
import { createSellDetail } from "../db/dellDetail";
import { createSell } from "../db/sell";
import Sell from "../models/sell.model";
import SellDetail from "../models/sellDetail.model";


export const addSell=async(req:Request,res:Response)=>{
    try{
        const {kind}=req.params ;
        const {person,total,user}=req.body;
        const detailsReq=req.body.details as Array<any>;
        const newSell:Sell={ person,user,total };
        const {exito}=await createSell(Number(kind),newSell);

        if(!exito){
            return res.status(401).json({
                ok:false,
                message:'Sell not created'
            });
        }

        const details=detailsReq.map((detail)=>{
            return {
                ...detail,
                sell:exito
            }
        }) as SellDetail[];
        details.forEach(async(detail,index)=>{
            const {exito}=await createSellDetail(detail);
            if(!exito){
                return res.status(401).json({
                    ok:false,
                    message:'Sell not created'
                });
            }
            details[index].id=exito;
        })
        newSell.id=exito;
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