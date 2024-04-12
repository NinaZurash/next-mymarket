"use client"
import Navbar from "@/components/navbar";
import ProductPage from "@/components/products/ProductPage";
import Image from "next/image";

export default function ProductsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
  <div className="flex min-h-screen gap-10 mt-[100px] flex-col items-center justify-between">
    <Navbar />
    <div className=" flex flex-col gap-10 p-8 w-full">
      <div className="flex w-full items-center justify-center">
        <div className="w-[80rem]">
        <Image alt="fanta" width={1000} height={1000} className="w-full rounded-xl"  src="https://port80ge.adocean.pl/files/x/xnl/pqiepuz/lefeckemtf/1272x128.png"/>
        </div>
      </div>
    <ProductPage productId={id} />;

    </div>
  </div>
  )

}
