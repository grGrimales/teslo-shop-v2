export const revalidate = 60;
import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "../components";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import Head from "next/head";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  
  return (
    <>


<Head>
        <title>Shop Page</title>
        <meta property="og:title" content="Shop Page" />
        <meta property="og:description" content="This is the Shop Page where you can find quality products." />
        <meta property="og:image" content="https://res.cloudinary.com/dcxto1nnl/image/upload/v1716248276/teslo-shop/Sin_t%C3%ADtulo_byptio.png" />
        <meta property="og:url" content="https://teslo-shop-next-store.vercel.app/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shop Page" />
        <meta name="twitter:description" content="This is the Shop Page where you can find quality products." />
        <meta name="twitter:image" content="https://res.cloudinary.com/dcxto1nnl/image/upload/v1716248276/teslo-shop/Sin_t%C3%ADtulo_byptio.png" />
      </Head>
      <Title
        title="Shop Page"
        subtitle="This is the Shop Page"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
