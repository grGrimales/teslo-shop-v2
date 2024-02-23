"use client";

import { QuantitySelector, SizeSelector } from "@/app/components";
import React, { useState } from "react";
import { CartProduct, Product, Size } from "../../../../../interfaces/product.interface";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct ={
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      size: size,
      quantity: quantity,
      image: product.images[0],
    }


    console.log(cartProduct)
    addProductToCart(cartProduct);

    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe Seleccionar una talla
        </span>
      )}

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
