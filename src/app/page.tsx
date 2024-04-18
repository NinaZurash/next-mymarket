import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import HomeProducts from "@/components/products/HomeProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col ">
      <Navbar />
      <Header />
      <div className="flex flex-col items-center justify-between px-[77px]">
        <HomeProducts />
        <Footer />
      </div>
    </main>
  );
}
