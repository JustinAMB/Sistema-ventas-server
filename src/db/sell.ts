import { RowDataPacket } from 'mysql2';
import Response from '../models/response.model';
import Sell from '../models/sell.model';
import connection from './connection';


export const getAllSell=async ():Promise<Sell[]>=>{
    const data =await connection.query('select * from sell') as RowDataPacket[][];
    return data[0] as Sell[];
} 
export const getSell=async(id:number):Promise<Sell>=>{
    const data =await connection.query('select * from sell where id=?',[id]) as RowDataPacket[][];
    return data[0][0] as Sell;
} 

export const createSell=async(sell:Sell):Promise<Response>=>{
    const {person,total,user}=sell;
    const data =await connection.query('call createSell(?,?,?)',[user,person,total]) as RowDataPacket[][];
    return data[0][0] as Response;
}
