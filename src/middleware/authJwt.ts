import { Request, Response } from 'express';
import jwt, { JwtPayload, verify, } from 'jsonwebtoken';
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';


import connection from '../db/connection';

export const verifyToken = (req:Request, res:Response, next: Function) => {

    try{
        const token=req.headers['x-access-token'] as string;
        if (!token) {
            return res.status(403).send({ ok: false, message: 'No token provided.' });

        }
        const decoded = verify(token, process.env.Secret!)as JwtPayload;
        req.body.userId=decoded.id;
        const data=connection.query(`select * from user where id=${decoded.id}`, (err, result: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader) => {
            console.log(result);
            if (!err) {
                return 
            }
            return (!err) ? result : null;
    
        });
        if (!data) {
            return res.status(400).send({ ok: false, message: 'User not found.' });
        }
        next();
    }catch(err){
        res.status(403).send({
            message: 'Token is not valid',
            ok: false
        });

    }
}
/*
export const getCantones = (req, res) => {

    const { provincia } = req.params;
    console.log(provincia.provincia);
    db.query('call ListaCantones(?)', [provincia], (err, result) => {
        console.log(result[0]);
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            data: result[0]
        });
    })
}*/