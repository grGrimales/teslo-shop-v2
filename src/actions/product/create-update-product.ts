'use server';

import { revalidate } from '@/app/(shop)/page';
import prisma from '@/lib/prisma';
import { Gender, Product, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const ProductSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number()
        .min(0)
        .transform(val => Number(val.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform(val => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform(val => val.split(',')),
    tags: z.coerce.string().transform(val => val.split(',')),
    gender: z.nativeEnum(Gender)
});

export const createUpdateProduct = async (formData: FormData) => {
    const data = Object.fromEntries(formData);

    const productParsed = ProductSchema.safeParse(data);

    if (!productParsed.success) {
        console.log(productParsed.error);
        return { ok: false, errors: productParsed.error };
    }

    const product = productParsed.data;
    const { id, ...rest } = product;

    // Convertir slug a lowercase y reemplazar espacios con guiones
    product.slug = product.slug.toLowerCase().replace(/ /g, '-');

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: Product;
            console.log('Original rest.tags:', rest.tags);

            const tagsArray = Array.isArray(rest.tags)
                ? rest.tags.map(tag => tag.trim().toLowerCase())
                : [];

      

            if (id) {
                // Actualizar producto existente
                product = await tx.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                });
            } else {
                // Crear nuevo producto
                product = await tx.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                });
                console.log(product, 'product created');
            }

            //Proceso de carga de imágenes 
            if (formData.getAll('images')) {
                const images = await uploadImages(formData.getAll('images') as File[]);

                if (!images) throw new Error('Error uploading images');

                // Actualizar el producto con las nuevas imágenes
                await prisma.productImage.createMany({
                    data: images.map((url) => ({
                        url: url! as string, // Add type assertion here
                        productId: product.id,
                    })),
                });
            }

            return product;
        });


        revalidatePath('/admin/products');
        revalidatePath(`/admin/product/${product.slug}`);
        revalidatePath(`/products/${product.slug}`);



        // Devolver producto actualizado o creado
        return { ok: true, product: prismaTx };

    } catch (error) {
        console.error('Transaction failed:', error);
        // En caso de error en la transacción, devolver ok: false y el error
        return { ok: false, message: 'Error al guardar el producto' };
    }
}


const uploadImages = async (images: File[]) => {
    try {
        const uploadPromises = images.map(async (file) => {
            try {
                const buffer = await file.arrayBuffer();
                const base64 = Buffer.from(buffer).toString('base64');

                // Subir la imagen a una carpeta específica en Cloudinary
                const result = await cloudinary.uploader.upload(
                    `data:image/png;base64,${base64}`,
                    {
                        folder: 'teslo-shop' // Especifica la carpeta aquí
                    }
                );

                return result.secure_url;
            } catch (error) {
                console.log(error, 'error uploading image');
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.error('Error uploading images:', error);
        return null;
    }
};


