import { RowDataPacket } from 'mysql2';
import User from '../models/user.model';
import connection from './connection';



export const getUser=async (id:number):Promise<User>=>{
   
    console.log(id);
    const data=await connection.query(`select * from user where id=?`, [id]) as RowDataPacket[][];
    
    return data[0][0] as User;
}

export const getUserByEmail=async (email:string):Promise<User>=>{
    
    console.log(email);
    const data=await connection.query(`select * from user where email=?`, [email]) as RowDataPacket[][];
    
    return data[0][0]  as User;
}
