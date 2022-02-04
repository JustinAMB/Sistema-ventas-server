import { RowDataPacket } from 'mysql2';
import Person from '../models/person.model';
import Response from '../models/response.model';
import connection from './connection';





export const getPerson=async (id:number):Promise<Person>=>{
    
    console.log(id);
    const data=await connection.query(`select * from person where id=?`, [id]) as RowDataPacket[][];
    
    return data[0][0] as Person;
}

export const getPersons=async (kind:number,state:boolean):Promise<Person[]>=>{
    
    console.log(kind);
    const data=await connection.query(`call listPersons(?,?)`, [kind,state]) as RowDataPacket[][];

    return data[0][0] as Person[];
}


export const createPerson=async (kind:number,person:Person):Promise<Response>=>{
        
    console.log(person);
    
    const data=await connection.query(` call createPerson(?,?,?,?,?,?)`, [kind,person.name,person.lastname,person.email,person.address,person.phone]) as RowDataPacket[][];
    
    return data[0][0][0]  as Response;
}

export const updatePerson=async (id:number,person:Person):Promise<Response>=>{
        
    console.log(person);
    const data=await connection.query(`call UpdatePerson(?,?,?,?,?,?)`, [id,person.name,person.lastname,person.email,person.address,person.phone]) as RowDataPacket[][];
    return data[0][0][0]  as Response;
}
export const activePerson=async (id:number,status:boolean):Promise<Response>=>{
       
    
    const data=await connection.query(`call ActivePerson(?,?)`, [id,status]) as RowDataPacket[][];
    
    return data[0][0][0] as Response;
}