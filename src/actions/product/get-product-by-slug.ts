
'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
    try {
        // 1. Obtener el producto
        const product = await prisma.product.findFirst({
        where: {
            slug,
        },
        include: {
            ProductImage: true,
        },
        });
    
      if(!product) return null;

        return {
            ...product,
            images: product.ProductImage.map((image) => image.url),
        };

    } catch (error) {
        throw new Error("No se pudo cargar el producto");
    }
}