'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
    console.log(imageUrl, 'imageUrl**********imageUrl');

    if (!imageUrl) {
        return {
            ok: false,
            errors: 'No se puede borrar imágenes de nuestros productos'
        };
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
    const folderName = 'teslo-shop'; // Nombre de la carpeta en Cloudinary
    const publicId = `${folderName}/${imageName}`;

    console.log(publicId, 'publicId**********publicId');

    try {
        // Verificar si la imagen existe en la base de datos
        const existingImage = await prisma.productImage.findUnique({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        if (!existingImage) {
            return {
                ok: false,
                errors: 'La imagen no existe en la base de datos'
            };
        }

        // Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Eliminar la imagen de la base de datos
        const deletedImage = await prisma.productImage.delete({
            where: { id: imageId },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        });

        // Revalidar los paths 
        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);

        return {
            ok: true
        };
    } catch (error) {
        console.log(error, 'error');

        return {
            ok: false,
            errors: 'No se pudo borrar la imagen'
        };
    }
};
