import fs from 'fs';
import { getProduct, updateImageProduct } from '../db/product';
import { getUser, updateImageUser } from '../db/user';
const borrarImagen = ( path:string ) => {
    
    if ( fs.existsSync( path ) ) {
        
        fs.unlinkSync( path );
    }
}
export const updateImage = async(tipo:string, id:number, nombreArchivo:string):Promise<boolean> => {

    let pathViejo:string = '';
    
    switch( tipo ) {
       
        
        case 'products':
            const product = await getProduct(id);
            if ( !product ) {
                console.log('No es un producto por id');
                return false;
            }

            pathViejo = `uploads/products/${ product.image }`;
            borrarImagen( pathViejo );

            
            const {exito}=await updateImageProduct(id,nombreArchivo);
            
            return exito>0;

        break;
        
        case 'users':

            const usuario = await getUser(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `uploads/users/${ usuario.image }`;
            borrarImagen( pathViejo );
            const {exito:ext}=await updateImageUser(id,nombreArchivo);
            return ext>0;

        break;
    }
    return false;

}