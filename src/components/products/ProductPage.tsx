"use client";

import { useProductById } from "@/services/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "./HomeProducts";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

export default function ProductPage({ productId }: { productId: string }) {
  const {mutateAsync} = useProductById();
  const [product,setProduct] = useState<Product|null>(null);

  useEffect(() => {
      const getProduct = async () => {
          const response =await mutateAsync({id: productId});
          setProduct(response.product)
      }
      getProduct()
  }, []);

  if (!product) return (
    <div className="m-10 border justify-center items-center p-4 flex ">
      <h1>Loading...</h1>
    </div>
  )
 
  console.log(product.description)
  return (
    <div className="m-10   items-center p-4 flex ">
      <Image className="border rounded-md" src={product.image} alt={product.title} width={300} height={300} />
      <div className="flex item flex-col gap-y-6 text-lg p-5 w-[700px]">
        <h1 className="font-bold w-full">{product.title}</h1>
        <hr></hr>
        <div className="flex items-center justify-between"><span>{product.price} ლ</span><Button className="border border-yellow-200 p-8 hover:bg-yellow-100 bg-white text-md  text-yellow-500 rounded-lg flex items-center gap-2 mr-8"><span>დაამატე კალათაში</span> <ShoppingCart /></Button></div>
        <hr></hr>
        <p className="text-sm">{product.description}</p>
      </div>
    </div>
  );
}
