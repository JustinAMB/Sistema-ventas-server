//reports
import { RowDataPacket } from 'mysql2';

import connection from './connection';





export const reportsGeneral =async ():Promise<number[]>=>{
        
    
    const data=await connection.query(`call reports()`) as RowDataPacket[][];
    
    return data[0][0] as number[];
}