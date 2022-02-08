export default interface Product{
    id?:number;
    name:string;
    image?:string;
    description?:string;
    barcode:string;
    price:number;
    inventary_min:number;
    inventary?:number;
    category:number;
    unit:string;
}