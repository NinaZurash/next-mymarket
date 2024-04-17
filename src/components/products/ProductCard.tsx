"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export type ProductType = {
  id: string;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="flex w-60 flex-col  gap-5 rounded-lg bg-white p-4">
      <Link href={`${BASE_URL}/products/${product.id}`}>
        <Image
          className="h-[170px] w-[350px] rounded-md object-cover "
          src={product.image}
          width={350}
          height={300}
          alt={product.title}
        />
        <div>{product.title}</div>
        <hr className=""></hr>
        <div className="flex items-center justify-between font-semibold">
          {product.price} ლ{" "}
          <span>
            <Heart className="rounded-lg bg-slate-200 p-2" size={30} />
          </span>
        </div>
      </Link>
    </div>
  );
}
