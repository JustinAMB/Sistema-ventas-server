import connection from './connection';
import { RowDataPacket } from 'mysql2';
import Product from '../models/product.model';
import Response from '../models/response.model';
export const getProduct=async(id:number=0):Promise<Product>=>{
    const data=await connection.query(`select * from product where id=?`, [id]) as RowDataPacket[][];
    return data[0][0] as Product;
}

export const getProductBarcode=async(code:string=''):Promise<Product>=>{
    const data=await connection.query(`select * from product where barcode=?`, [code]) as RowDataPacket[][];
    return data[0][0] as Product;
}
export const getProducts=async(is_active:boolean):Promise<Product[]>=>{
    const data=await connection.query(`select * from product where is_active=?`, [is_active]) as RowDataPacket[][];
    return data[0] as Product[];
}




export const createProduct=async(product:Product):Promise<Response>=>{
    const {name,price,barcode,unit,category,inventary_min,image}=product;
    const data= await connection.query('call createProduct(?,?,?,?,?,?,?)',[name,barcode,image,price,unit,inventary_min,category]) as RowDataPacket[][];
    return data[0][0][0]  as Response;

}
export const updateProduct=async(id:number,product:Product):Promise<Response>=>{
    const {name,price,barcode,unit,category,inventary_min,image}=product;
    const data= await connection.query('call updateProduct(?,?,?,?,?,?,?,?)',[id,name,barcode,image,price,unit,inventary_min,category]) as RowDataPacket[][];
    return data[0][0][0]  as Response;

}



export const activeProduct=async(id:number,is_active:boolean):Promise<Response>=>{
    const data=await connection.query('call activeProduct(?,?)',[id,is_active]) as RowDataPacket[][];
    return data[0][0][0]  as Response;
}


export const updateImageProduct=async(id:number,img:string):Promise<Response>=>{
    const data=await connection.query('call updateImageProduct(?,?)',[id,img]) as RowDataPacket[][];
    return data[0][0][0]  as Response;
}
export const searchInventary=async(term:string):Promise<Product[]>=>{
    
    const data= await connection.query('call searchInventary(?)',[term]) as RowDataPacket[][];
    return data[0][0]  as Product[];

}