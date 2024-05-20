export const revalidate = 604800 // 1 week

import { notFound } from 'next/navigation';

import { titleFont } from '@/config/fonts';
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/app/components';
import { getProductBySlug } from '@/actions/product/get-product-by-slug';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '', 
    image: [`/products/${product?.images[0]}`],
   openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[0]}`],
   }
  };
}

export default async function ProductBySlugPage ( { params }: Props ) {

  const { slug } = params;
  const product = await getProductBySlug( slug );

  if ( !product ) {
    notFound();
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */ }
      <div className="col-span-1 md:col-span-2 ">
        
        {/* Mobile Slideshow */}
         <ProductMobileSlideshow 
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        /> 
        
        {/* Desktop Slideshow */}
        <ProductSlideshow 
          title={ product.title }
          images={ product.images }
          className="hidden md:block"
        /> 

        
      </div>

      {/* Detalles */ }
      <div className="col-span-1 px-5">
     <StockLabel slug={product.slug} />
        <h1 className={ ` ${ titleFont.className } antialiased font-bold text-xl` }>
          { product.title }
        </h1>
        <p className="text-lg mb-5">${ product.price }</p>


<AddToCart  product={product} />

        {/* Descripción */ }
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>

    </div>
  );
}


