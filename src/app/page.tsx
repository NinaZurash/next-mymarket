import Navbar from "@/components/navbar";
import HomeProducts from "@/components/products/HomeProducts";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <HomeProducts />
    </main>
  );
}
