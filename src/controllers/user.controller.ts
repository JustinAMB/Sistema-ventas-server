import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {getUserByEmail} from '../db/user';
import { comparePassword } from '../helpers/encryption';
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
        const isMatch=await comparePassword(password, user.password);
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