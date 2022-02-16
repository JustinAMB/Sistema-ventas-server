//reports
import { RowDataPacket } from 'mysql2';
import Report from '../models/report.model';

import connection from './connection';





export const reportsGeneral =async ():Promise<number[]>=>{
        
    
    const data=await connection.query(`call reports()`) as RowDataPacket[][];
    
    return data[0][0] as number[];
}
export const productsTop =async ():Promise<Report[]>=>{
        
    
    const data=await connection.query(`call productsTop()`) as RowDataPacket[][];
    
    return data[0][0] as Report[];
}

