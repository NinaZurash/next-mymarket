"use client";

import { useAllProducts } from "@/services/products";

import Image from "next/image";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";

import { ProductType } from "@/types/globalTypes";

export default function VipProducts() {
  const { mutateAsync } = useAllProducts();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await mutateAsync();
      setProducts(response?.products);
    };
    fetchProducts();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Rocket size={40} className="rounded-xl bg-[#fd541b] p-2 text-white" />
        <span className="text-lg font-bold">Super VIP</span>
      </div>
      <div className="flex justify-between gap-y-3">
        {products.slice(0, 6).map((product) => (
          <Link key={product.id} href={`products/${product.id}`}>
            <div className="flex w-[180px]  flex-col gap-4">
              <Image
                className="h-[150px]  w-full rounded-xl object-cover"
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
              />
              <span className="mt-2 line-clamp-2 shrink-0 text-sm font-semibold">
                {product.title}
              </span>
              <span className="font-bold">{product.price} ლ</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
