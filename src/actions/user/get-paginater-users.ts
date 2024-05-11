'use server';

import prisma from "@/lib/prisma";
import { auth } from "../../../auth.config";



export const getPaginatedUsers = async () =>{

const session = await auth();

if(session?.user.role !== 'admin'){
return{
ok: false,
message: 'Debe de estar autenticado'
}
}

try {
    const users = await prisma.user.findMany({
        orderBy:{
            name: 'desc'
        }
    });
    return{
        ok: true,
        users
    }

} catch (error) {
    console.log(error);
    return{
        ok: false,
        message: 'Error al obtener los usuarios'
    }
}



}