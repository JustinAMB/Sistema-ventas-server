
import {Response,Request} from 'express';
import { productsCategory, productsTop, reportsGeneral, sellsDay } from '../db/reports';
export const getReports =  async (
    req:Request,
    res:Response
) => {
    try {
        const is_active = req.query['is_active'] as string;
         const reports= await reportsGeneral() || [];
         const sellFav=await productsTop() || [];
         const productXcategory=await productsCategory() || [];
         const sellDay=await sellsDay() || [];
        return res.status(200).json({
            ok: true,
            data:{
                reports,
                sellFav,
                productXcategory,
                sellDay
            }
        });
    } catch (err) {
        res.status(501).json({
            ok: false,
            messge: 'Error al obtener los reportes'
        });
    }
}