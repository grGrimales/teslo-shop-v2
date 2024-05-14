import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { Title } from "@/app/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/product/get-categories";

interface Props {
  params: {
    slug: string;
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = params;


  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ])

  if (!product) redirect("/admin/products");
  const title = slug === "new" ? "New Product" : "Edit Product";

  return (
    <>
      <Title title={title} />

      <ProductForm product={product} categories={categories} />
    </>
  );
}
