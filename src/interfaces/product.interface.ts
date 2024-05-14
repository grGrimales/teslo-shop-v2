export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
   // type: Type;
    gender: CategoryProduct
  }
  


  export interface CartProduct{
    id: string;
    title: string;
    slug: string;
    price: number;
    size: Size;
    quantity: number;
    image: string;
  }


 export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}
  export type CategoryProduct = 'men'|'women'|'kid'|'unisex'
  export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
  export type Type = 'shirts'|'pants'|'hoodies'|'hats';