

'use server';


import prisma from '@/lib/prisma';
import { auth } from '../../../auth.config';
import { Product } from '../../interfaces/product.interface';


export const getOrderById = async (id: string) => {

    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) return { ok: false, message: 'No user found' };

    try {
        const order = await prisma.order.findUnique({
            where: {
                id,
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!order) throw (`${id} no existe - 500`);

        if(session.user.role === 'user' && session.user.id !== order.userId) throw new Error('No tienes permisos para ver esta orden');

        return {
            ok: true,
            order
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'No se pudo cargar la orden'
        }
    }


};