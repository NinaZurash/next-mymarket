"use client"

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProductType = {
    id: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductCard({product}:{product:ProductType}) {
  return (
    <div className="flex flex-col w-60  bg-white rounded-lg gap-5 p-4">
        <Link href={`${BASE_URL}/products/${product.id}`}>
            <Image className="w-[350px] h-[170px] object-cover rounded-md " src={product.image} width={350} height={300} alt={product.title}/>
            <div>{product.title}</div>
            <hr className=""></hr>
            <div className="flex justify-between font-semibold items-center">{product.price} ლ <span><Heart className="bg-slate-200 p-2 rounded-lg" size={30}/></span></div>
        </Link>
    </div>

  )
}