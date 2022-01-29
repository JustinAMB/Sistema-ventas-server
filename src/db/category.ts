import { RowDataPacket } from 'mysql2';

import connection from './connection';

import Category from '../models/category.model';
import  Response  from '../models/response.model';


export const getCategorys=async ():Promise<Category[]>=>{
    
    const data=await connection.query(`select * from category `) as RowDataPacket[][];
    
    return data[0] as Category[];
}

export const getCategory=async (id:number):Promise<Category>=>{
    
    console.log(id);
    const data=await connection.query(`select * from category where id=?`, [id]) as RowDataPacket[][];
    
    return data[0][0] as Category;
}
export const createCategory=async (category:Category):Promise<Response>=>{
        
    console.log(category);
    
    const data=await connection.query(`call CreateCategory(?)`, [category.name]) as RowDataPacket[][];
    const result:Response=data[0][0][0] as Response;
    console.log(result);
    return result;
}

export const updateCategory=async (id:number,category:Category):Promise<Response>=>{
        
    console.log(category);
    
    const data=await connection.query(`call UpdateCategory(?,?)`, [id,category.name]) as RowDataPacket[][];
    
    return data[0][0] as Response;
}