"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type product = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
};
export default function HomeProducts() {
  const [products, setProducts] = useState<product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("https://fakestoreapi.com/products").then(
        (res) => res.json()
      );
    };
    setProducts(products);
  }, [products]);
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.title}</h1>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <Image src={product.image} alt={product.title} />
        </div>
      ))}
    </div>
  );
}
