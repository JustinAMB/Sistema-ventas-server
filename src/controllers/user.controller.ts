import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {activeUser, createUser, getUser, getUserByEmail, getUsers, updateUser} from '../db/user';
import { comparePassword ,encryptPassword} from '../helpers/encryption';
import { convertBoolean } from '../helpers/stringBool';
import User from '../models/user.model';
export const singIn=async(req:Request, res:Response)=>{
    try{
        const {email, password}=req.body;
        console.log(email, password); 
        const user=await getUserByEmail(email);
        if(!user){
            return res.status(400).json({
                ok:false,
                message:'User not found'
            });
        }
        const isMatch=await comparePassword(password, user.password!);
        if(!isMatch){
            return res.status(400).json({
                ok:false,
                message:'Invalid password'
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.Secret!, {
            expiresIn: 21600, 
          });
          res.status(202).json({
            ok: true,
            message: 'User signed in',
            data: {
                user,
                token
            }
        });
    }
    catch(err){
        res.status(500).json({
            ok:false,
            msg:err
        })
    }
}


export  const getAllUsers=async (req:Request,res:Response)=>{
    try{
        const is_active=req.query.iss_active as string;
        const data=await getUsers(convertBoolean(is_active));
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}


export  const getUserById=async (req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const data=await getUser(Number(id));
        return res.status(200).json({
            ok:true,
            data
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}

export const addUser = async(req:Request,res:Response)=>{
    try{
        const {name,email,lastname,image,rol}=req.body;
        const newUser:User={
            name,
            email,
            image,
            lastname,
            rol,   
        }
        newUser.password=await encryptPassword('12345678');
        const result=await createUser(newUser);
        
        if(result.exito===0){
            return res.status(401).json({
                ok:false,
                message:'User not created'
            });
        }
        
        return res.status(200).json({
            ok:true,
            message:'User created'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}







export const updateUserById = async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {name,email,lastname,password,image,rol}=req.body;
        const uUser:User={
            name,
            email,
            image,
            lastname,
            rol,   
        }
        uUser.password=await encryptPassword(password);
        const result=await updateUser(Number(id),uUser);
        if(!result){
            return res.status(500).json({
                ok:false,
                message:'User not updated'
            });
        }
        return res.status(200).json({
            ok:true,
            message:'User updated'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}

export const activeUserById = async(req:Request,res:Response)=>{
    try{
      
        const {id}=req.params;
        const status=req.query.status as string;
        const result=await activeUser(Number(id),convertBoolean(status));
        if(!result){
            return res.status(500).json({
                ok:false,
                message:'User not active'
            });
        }
        return res.status(200).json({
            ok:true,
            message:'User active'
        });
    }
    catch(err){
        res.status(501).json({
            ok:false,
            msg:err
        })
    }
}