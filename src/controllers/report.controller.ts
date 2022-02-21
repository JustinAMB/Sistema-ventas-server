
import {Response,Request} from 'express';
import { productsCategory, productsTop, reportsGeneral, sellsDay } from '../db/reports';
export const getReports =  async (
    req:Request,
    res:Response
) => {
    try {
        
         const generals= await reportsGeneral() ;
            
         const sellFav=await productsTop() || [];
         const reports=[];
         for (const property in generals) {
            reports.push(generals[property]|| 0);
          }
          
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
        console.log(err);
        res.status(501).json({
            ok: false,
            message: 'Error al obtener los reportes'
        });
    }
}