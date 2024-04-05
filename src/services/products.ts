import { toast } from "@/components/ui/use-toast";

export const getCategories = async () => {
  try {
    const products = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());
    return products;
  } catch {
    throw new Error("Failed to fetch categories");
  }
};

export const getAllProducts = async () => {
  try {
    const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    return products;
  } catch {
    throw new Error("Failed to fetch products");
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await fetch(`https://fakestoreapi.com/products/${id}`).then(
      (res) => res.json()
    );
    return product;
  } catch {
    throw new Error("Failed to fetch product");
  }
};
