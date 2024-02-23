'use server';

import prisma from "@/lib/prisma";


export const getStockBySlug = async (slug: string) => {
    try {
        // 1. Obtener el stock
        const product = await prisma.product.findFirst({
        where: {
            slug,
        },
        select: {
            inStock: true,
        }
        });

        if(!product) return 0;
        return product.inStock;
     

    } catch (error) {
        return 0;
    }
}