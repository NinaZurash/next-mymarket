"use client";

import { Product } from "@/components/products/HomeProducts";
import { getAllProducts, getCategories } from "@/services/products";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartProduct = Product & {
  quantity: number;
};

export type ProductsContextType = {
  products: Product[];
  categories: string[];
  userCart: CartProduct[];
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  categories: [],
  userCart: [],
});
type Props = { children: ReactNode };

export const ProductsProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [userCart, setUserCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    const fetchAllProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchCategories();
    fetchAllProducts();
  }, []);

  const values = {
    products,
    categories,
    userCart,
  };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductsContext);
};
