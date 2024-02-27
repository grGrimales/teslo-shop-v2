import { initialData } from "./seed";
import prisma from '../lib/prisma';
import { deleteUserAddress } from '../actions/address/delete-user-address';
import { countries } from './seed-countries';

async function main(){
console.log('Ejecutado desde seed-database.ts')

//1. Eliminar todos los datos de la base de datos
await prisma.userAddress.deleteMany();
   await prisma.user.deleteMany(),
   await prisma.country.deleteMany(),

   await prisma.productImage.deleteMany(),
   await prisma.product.deleteMany(),
   await prisma.category.deleteMany()
//2. Categoria

const {categories, products, users, } = initialData;


await prisma.country.createMany({
    data: countries
});

await prisma.user.createMany({
    data: users
});

const categoriesData = categories.map((name) => ({name}));
console.log(categoriesData);


await prisma.category.createMany({
    data: categoriesData
});

const categoriesDb = await prisma.category.findMany();

const categoriesMap = categoriesDb.reduce((map, category) => {
 
map[category.name.toLocaleLowerCase()] = category.id;
    return map;

}, {} as Record<string, string>);

//3. Productos

products.forEach(async (product) => {
    const {type, images, ...rest} = product;
    const dbProduct =  await prisma.product.create({
        data: {
            ...rest,
            categoryId: categoriesMap[type.toLocaleLowerCase()]
        }
    });
// Imagenes

const imagesData = images.map((image) => ({
   url: image,
    productId: dbProduct.id
}));
await prisma.productImage.createMany({
    data: imagesData
});

});



}

(() => {
if(process.env.NODE_ENV === 'production') return;
    main();
})();