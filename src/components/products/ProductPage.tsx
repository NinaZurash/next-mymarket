"use client";

import { useProducts } from "@/provider/ProductsProvider";
import Image from "next/image";

export default function ProductPage({ productId }: { productId: string }) {
  const { products } = useProducts();

  const product = products.find((product) => product.id === Number(productId));

  if (!product) {
    console.error("Product not found");
    return <h1>Product not found</h1>;
  }
  return (
    <div className="m-10 border justify-center items-center p-4 flex ">
      <Image src={product.image} alt={product.title} width={400} height={400} />
      <div className="flex flex-col gap-y-6 text-lg p-5">
        <h1 className="font-bold w-full">{product.title}</h1>
        <p>{product.price} $</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
