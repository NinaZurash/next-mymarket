import ProductPage from "@/components/products/ProductPage";

export default function ProductsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <ProductPage productId={id} />;
  // return <h1>ok</h1>;
}
