"use client"

import Navbar from "@/components/navbar";
import { CATEGORIES } from "@/components/products/CategoriesList";
import { Product } from "@/components/products/HomeProducts";
import ProductCard from "@/components/products/ProductCard";
import { useProductsByCategory } from "@/services/products";
import { ArrowBigDown, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";


const FILTERS = ["ფასი", "მდებარეობა","გაყიდვის ტიპი","განვადებით სარგებლობა"]

export default function ProductsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [products,setProducts] = useState<Product[]>([]);
  const {mutateAsync} = useProductsByCategory();

    useEffect(() => {
        const getProducts = async () => {
            const response =await mutateAsync({category: id});
            setProducts(response.products)
        }
        getProducts()
    }, []);
  return (
  <div className="flex min-h-screen gap-10 mt-[100px] flex-col items-center justify-between">
    <Navbar />
    <div className="bg-[#f0f3f6] flex flex-col gap-10 p-8 w-full">
      <div className="flex w-full items-center justify-center">
        <div className="w-[80rem]">
        <iframe  className="w-full" src="https://port80ge.adocean.pl/files/x/wkc/rbloogq/rchhlpqsil/1272x128/1272x128.html" ></iframe>
        </div>
      </div>
    <h1 className="font-thin">კატეგორია{' > '}{CATEGORIES[id as keyof typeof CATEGORIES].title}</h1>
    <div className="flex gap-10">
      <div className="bg-white">
        {
          FILTERS.map((filter) => (
            <div key={filter} className="flex items-center justify-between px-10 w-72 py-4 border-b-2 border-[#f0f3f6]">{filter} <ChevronDown size={13} /> </div>
          ))
        }
      </div>
      <div className="flex gap-8 flex-1">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
    </div>
      
    </div>
  </div>)
}
