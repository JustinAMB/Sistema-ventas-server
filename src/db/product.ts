import connection from './connection';
import { RowDataPacket } from 'mysql2';
import Product from '../models/product.model';
import Response from '../models/response.model';
export const getProduct=async(id:number=0):Promise<Product>=>{
    const data=await connection.query(`select * from product where id=?`, [id]) as RowDataPacket[][];
    return data[0][0] as Product;
}

export const getProducts=async(is_active:boolean):Promise<Product[]>=>{
    const data=await connection.query(`select * from product where is_active=?`, [is_active]) as RowDataPacket[][];
    return data[0] as Product[];
}




export const createProduct=async(product:Product):Promise<Response>=>{
    const {name,description,price,barcode,unit,category,inventary,inventary_min,image}=product;
    const data= await connection.query('call createProduct(?,?,?,?,?,?,?,?,?)',[name,description,price,barcode,unit,category,inventary,inventary_min,image]) as RowDataPacket[][];
    return data[0][0] as Response;

}
export const updateProduct=async(id:number,product:Product):Promise<Response>=>{
    const {name,description,price,barcode,unit,category,inventary,inventary_min,image}=product;
    const data= await connection.query('call updateProduct(?,?,?,?,?,?,?,?,?,?)',[id,name,description,price,barcode,unit,category,inventary,inventary_min,image]) as RowDataPacket[][];
    return data[0][0] as Response;

}



export const activeProduct=async(id:number,is_active:boolean):Promise<Response>=>{
    const data=await connection.query('call activeProduct(?,?)',[id,is_active]) as RowDataPacket[][];
    return data[0][0] as Response;
}