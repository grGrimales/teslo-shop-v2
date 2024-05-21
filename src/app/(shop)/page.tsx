export const revalidate = 60;
import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "../components";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";


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
