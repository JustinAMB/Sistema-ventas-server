import { RowDataPacket } from 'mysql2';

import connection from './connection';

import Category from '../models/category.model';
import { Response } from 'express';


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
    
    const data=await connection.query(`call CreateCategory(?,?,?)`, [category.image,category.name,category.description]) as RowDataPacket[][];
    
    return data[0][0] as Response;
}

export const updateCategory=async (id:number,category:Category):Promise<Response>=>{
        
    console.log(category);
    
    const data=await connection.query(`call UpdateCategory(?,?,?,?)`, [id,category.image,category.name,category.description]) as RowDataPacket[][];
    
    return data[0][0] as Response;
}