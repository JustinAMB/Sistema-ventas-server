import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import crypto from 'crypto';
import  {updateImage}  from '../helpers/updateImage';
import { FileArray, UploadedFile } from 'express-fileupload';
export const fileUpload = ( req:Request, res :Response) => {

    const tipo = req.params.tipo;
    const id   = req.params.id as unknown as number;
    const files=req.files as FileArray ;
    console.log(tipo)
    // Validar tipo
    const tiposValidos = ['products','users'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar la imagen...
    const file = files.imagen as UploadedFile ;

    const nombreCortado = file.name.split('.'); // wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ crypto.randomUUID()}.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        updateImage( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}


export const  getImage=(req:Request, res:Response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImage = path.join( __dirname, `../../uploads/${ tipo }/${ foto }`);
    console.log(pathImage)
    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        const pathNoImage = path.join( __dirname, '../assets/no-image.jpg');
        res.sendFile(pathNoImage);
    }
}
