import { RowDataPacket } from 'mysql2';
import Response from '../models/response.model';

import SellDetail from '../models/sellDetail.model';
import connection from './connection';


export const getAllSellDetails=async (sell:number):Promise<SellDetail[]>=>{
    const data =await connection.query('select * from sellDetail where sell=?',[sell]) as RowDataPacket[][];
    return data[0] as SellDetail[];
} 
export const getSell=async(id:number):Promise<SellDetail>=>{
    const data =await connection.query('select * from sellDetail where id=?',[id]) as RowDataPacket[][];
    return data[0][0] as SellDetail;
} 

export const createSellDetail=async(sellDetail:SellDetail):Promise<Response>=>{
    const {sell,product,quantity,priceUnit}=sellDetail;
    const data =await connection.query('call createSellDetail(?,?,?,?)',[sell,product,quantity,priceUnit]) as RowDataPacket[][];
    return data[0][0] as Response;
}
