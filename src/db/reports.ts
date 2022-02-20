//reports
import { RowDataPacket } from 'mysql2';
import Report from '../models/report.model';

import connection from './connection';





export const reportsGeneral =async ():Promise<number[]>=>{
        
    
    const data=await connection.query(`call reports()`) as RowDataPacket[][];
    
    return data[0][0][0] as number[];
}
export const productsTop =async ():Promise<Report[]>=>{
        
    
    const data=await connection.query(`SELECT name,ventas as quantity FROM puntoventa.producttop limit 5`) as RowDataPacket[][];
    
    return data[0] as Report[];
}

export const productsCategory =async ():Promise<Report[]>=>{
        
    
    const data=await connection.query(`SELECT name,cantidad as quantity FROM categoriesxproduct limit 10`) as RowDataPacket[][];
    
    return data[0] as Report[];
}
export const sellsDay =async ():Promise<Report[]>=>{
        
    
    const data=await connection.query(`SELECT * FROM sellsByDay`) as RowDataPacket[][];
    
    return data[0] as Report[];
}