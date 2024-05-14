
'use server';

import prisma from "@/lib/prisma";


export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
             name: 'asc'
            },
        });


        console.log('Categoorias',categories)
        return categories;
    } catch (error) {

        console.log(error)

        return [];
    }
}