import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import HomeProducts from "@/components/products/HomeProducts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <HomeProducts />
      <Footer />
    </main>
  );
}
