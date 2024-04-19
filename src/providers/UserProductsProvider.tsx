"use client";

import { useGetCart } from "@/services/cart";
import { useGetMyProducts } from "@/services/newProduct";
import { set } from "zod";

import { useSession } from "next-auth/react";
import { User } from "lucide-react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ProductType } from "@/types/globalTypes";

type UserProductsContextType = {
  userProducts: ProductType[];
  setUserProducts: (wishlist: ProductType[]) => void;
};

const UserProductsContext = createContext<UserProductsContextType>({
  userProducts: [],
  setUserProducts: () => null,
});

type Props = { children: ReactNode };

export const UserProductsProvider = ({ children }: Props) => {
  const { mutateAsync } = useGetMyProducts();
  const { data: session } = useSession();
  const [userProducts, setUserProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getUserProducts = async () => {
      if (!session?.user) return;
      const response = await mutateAsync({ userId: session?.user?.id });

      setUserProducts(response.data);
    };
    getUserProducts();
  }, [session?.user, mutateAsync]);

  const values = { userProducts, setUserProducts };
  return <UserProductsContext.Provider value={values}>{children}</UserProductsContext.Provider>;
};

export const useUserProducts = () => {
  return useContext(UserProductsContext);
};
