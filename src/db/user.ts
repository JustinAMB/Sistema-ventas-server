import { RowDataPacket } from 'mysql2';
import Response from '../models/response.model';
import User from '../models/user.model';
import connection from './connection';



export const getUser=async (id:number):Promise<User>=>{
   
    console.log(id);
    const data=await connection.query(`select * from user where id=?`, [id]) as RowDataPacket[][];
    
    return data[0][0] as User;
}
export const getUsers=async(is_active:boolean):Promise<User[]>=>{
    const data =await connection.query(`select id,name,lastname,email,image,rol from user where is_active=?`, [is_active]) as RowDataPacket[][];
    return data[0] as User[];

}
export const getUserByEmail=async (email:string):Promise<User>=>{
    
    console.log(email);
    const data=await connection.query(`select * from user where email=?`, [email]) as RowDataPacket[][];
    
    return data[0][0]  as User;
}



export const createUser=async (user:User):Promise<Response>=>{
    const {name,email,lastname,rol,image,password}=user;
    const data= await connection.query(`call CreateUser(?,?,?,?,?,?)`,[name,lastname,email,password,image,rol]) as RowDataPacket[][] ;
    return data[0][0][0] as Response;
}

export const updateUser=async (id:number,user:User):Promise<Response>=>{
    const {name,email,lastname,rol,image,password}=user;
    const data= await connection.query(`call UpdateUser(?,?,?,?,?,?,?)`,[id,name,lastname,email,password,image,rol]) as RowDataPacket[][] ;
    return data[0][0][0] as Response;
}


export const activeUser=async(id:number,status:boolean):Promise<Response>=>{
    const data= await connection.query(`call IeActivarUser(?,?)`,[id,status]) as RowDataPacket[][] ;
    return data[0][0] as Response;

}