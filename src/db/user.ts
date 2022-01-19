import { RowDataPacket } from 'mysql2';
import connection from './connection';



export const getUser=async (id:number)=>{
    let user;
    console.log(id);
    const data=await connection.query(`select * from user where id=?`, [id]) as RowDataPacket[][];
    
    return data[0][0];
}

