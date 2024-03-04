'use server';

import prisma from "@/lib/prisma";
import { auth } from "../../../auth.config";


export const getOrdersByuser= async () =>{
    const session = await auth();

    if(!session?.user){
        return{
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {

        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
            },
            include: {
               OrderAddress:{
                    select:{
                        firstName: true,
                        lastName: true,
                    }
               }
            }
        });
        return{
            ok: true,
            orders
        }
        
    } catch (error) {
        
    }
}