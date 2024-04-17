import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default function ShoppingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
