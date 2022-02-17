import { Request,Response } from "express";
import { createSellDetail, getAllSellDetails, getSell } from "../db/dellDetail";
import { createSell } from "../db/sell";
import Sell from "../models/sell.model";
import SellDetail from "../models/sellDetail.model";


export const addSell=async(req:Request,res:Response)=>{
    try{
        const {kind}=req.params ;
        const {person,total,user}=req.body;
        const detailsReq=req.body.details as Array<any>;
        const newSell:Sell={ person,user,total };
        const resp=await createSell(Number(kind),newSell);

        if(!resp){
            return res.status(401).json({
                ok:false,
                message:'Se no se a podido realizado la operacion, por favor intente de nuevo'
            });
        }
        
        const {id:exito}=resp;
        const details=detailsReq.map((detail)=>{
            return {
                ...detail,
                sell:exito
            }
        }) as SellDetail[];
        let ban:boolean=false;
        details.forEach(async(detail,index)=>{
            const {exito}=await createSellDetail(detail);
                console.log('exitodetails:',exito);
            if(!exito){
               ban=true;
               return;

            }
            details[index].id=exito;
        });
        if(ban){
            return res.status(401).json({
                ok:false,
                message:'Se no se a podido realizado la operacion, por favor intente de nuevo'
            });
        }
       
        
            console.table(details);
        return res.status(200).json({
            ok:true,
            message:'Se ha realizado la operacion satisfactoriamente',
            data:{
                sell:resp,
                details
            }
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            message:'Error inesperado',
        })
    }
}

export const getSellById=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const sell=await getSell(Number(id));
        const details=await getAllSellDetails(Number(id));
        if(!sell){
            return res.status(404).json({
                ok:false,
                message:'No se encontro la venta'
            });
        }
        return res.status(200).json({
            ok:true,
            data:{
                sell,
                details
            }
        });
    } catch(err){
        res.status(500).json({
            ok:false,
            message:'Error inesperado'
        });

    }
}
