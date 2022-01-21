export default interface Product{
    id?:number;
    name:string;
    image?:string;
    description:string;
    barcode:string;
    price_in:number;
    price_out:number;
    inventary_min:number;
    is_active:boolean;
    category:number;
    unit:string;
}