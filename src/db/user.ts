import { RowDataPacket } from 'mysql2';
import connection from './connection';



export const getUser=async (id:number)=>{
   
    console.log(id);
    const data=await connection.query(`select * from user where id=?`, [id]) as RowDataPacket[][];
    
    return data[0][0];
}

export const getUserByEmail=async (email:string)=>{
    
    console.log(email);
    const data=await connection.query(`select * from user where email=?`, [email]) as RowDataPacket[][];
    
    return data[0][0];
}
