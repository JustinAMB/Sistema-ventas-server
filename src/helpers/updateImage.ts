import fs from 'fs';
import { getProduct, updateImageProduct } from '../db/product';
import { getUser, updateImageUser } from '../db/user';
const borrarImagen = ( path:string ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}
export const actualizarImagen = async(tipo:string, id:number, nombreArchivo:string) => {

    let pathViejo:string = '';
    
    switch( tipo ) {
       
        
        case 'hospitales':
            const product = await getProduct(id);
            if ( !product ) {
                console.log('No es un hospital por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ product.image }`;
            borrarImagen( pathViejo );

            
            await updateImageProduct(id,nombreArchivo);
            return true;

        break;
        
        case 'usuarios':

            const usuario = await getUser(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ usuario.image }`;
            borrarImagen( pathViejo );
            await updateImageUser(id,nombreArchivo);
            return true;

        break;
    }


}