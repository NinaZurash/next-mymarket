import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";

export default function ShoppingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
