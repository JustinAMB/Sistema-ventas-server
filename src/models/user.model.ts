export default interface User{
    id:number;
    name:string;
    lastname:string;
    username?:string;
    image:string;
    email:string;
    password:string;
    is_active:boolean;
    created_at:Date;
    rol:number;
}