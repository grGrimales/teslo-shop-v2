"use client";

import { createUpdateProduct } from "@/actions/product/create-update-product";
import { deleteProductImage } from "@/actions/product/delete-product-image";
import { ProductImage } from "@/app/components";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  tags: string;
  sizes: string[];
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;

images?: FileList;
}



export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      sizes: product.sizes ?? [],

      images: undefined,
    },
  });


  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    if (sizes.has(size)) {
      sizes.delete(size);
    } else {
      sizes.add(size);
    }
    setValue("sizes", Array.from(sizes));

  };

  const onSubmit = async (data: FormInputs) => {
    console.log({ data });
  

    const formData = new FormData();

    const {images, ...prodyuctToSave} = data;


    if(product.id) formData.append("id", product.id ?? "");
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("tags", data.tags);
    formData.append("inStock", data.inStock.toString());
    formData.append("sizes", prodyuctToSave.sizes.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("gender", prodyuctToSave.gender);

  if(images){
    for(let i = 0; i < images.length; i++){
      formData.append("images", images[i]);
    }
  }
    const {ok, product:productUpdate} = await createUpdateProduct(formData);

    if(!ok) return alert("Error al guardar el producto");

   router.replace(`/admin/product/${productUpdate?.slug}`);
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}

    
      <div className="w-full">
      <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              {...register("images")}
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ''}
                  src={`${image.url}`}
                  width={288}
                  height={288}
                  className="rounded-t shadow-md "
                />
  
                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger w-full xl:w-72 rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
