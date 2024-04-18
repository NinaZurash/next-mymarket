"use client";

import Image from "next/image";

import Navbar from "@/components/navbar";
import ProductPage from "@/components/products/ProductPage";

export default function ProductsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div className=" flex min-h-screen flex-col items-center justify-between gap-10">
      <div className=" flex w-full flex-col gap-10 p-8">
        <div className="flex w-full items-center justify-center">
          <div className="w-[80rem]">
            <Image
              alt="fanta"
              width={1000}
              height={1000}
              className="w-full rounded-xl"
              src="https://port80ge.adocean.pl/files/x/xnl/pqiepuz/lefeckemtf/1272x128.png"
            />
          </div>
        </div>
        <ProductPage productId={id} />;
      </div>
    </div>
  );
}
