'use server';

import prisma from "@/lib/prisma";
import { auth } from "../../../auth.config";
import { revalidate } from "@/app/(shop)/page";
import { revalidatePath } from "next/cache";



export const changeUserRole = async (userId: string, role: 'admin' | 'user') => {

    const session = await auth();

    if(session?.user.role !== 'admin'){
        return{
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    if(role !== 'admin' && role !== 'user'){
        return{
            ok: false,
            message: 'El rol no es válido'
        }
    }
    try {

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role
            }
        });
        revalidatePath('/admin/users');

        return {
            ok: true,
        }
       
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al actualizar el rol del usuario'
        }
    }
}

