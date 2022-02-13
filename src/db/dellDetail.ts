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
/***product int, in _sell int,in priceUnit decimal(12,2),in quantity int */
export const createSellDetail=async(sellDetail:SellDetail):Promise<Response>=>{
    const {sell,product,quantity,priceUnit}=sellDetail;
    const data =await connection.query('call createSellDetail(?,?,?,?)',[product,sell, priceUnit,quantity]) as RowDataPacket[][];
    return data[0][0][0]  as Response;
}
