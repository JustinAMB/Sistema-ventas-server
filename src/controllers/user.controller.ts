import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {createUser, getUserByEmail, getUsers} from '../db/user';
import { comparePassword ,encryptPassword} from '../helpers/encryption';
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
        const {is_active}=req.query;
        const data=await getUsers(Boolean(is_active));
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
        if(!result){
            return res.status(500).json({
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