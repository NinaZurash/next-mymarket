"use client";

import { useGetCart } from "@/services/cart";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ProductType } from "@/types/globalTypes";

type CartContextType = {
  cart: ProductType[];
  setCart: (wishlist: ProductType[]) => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => null,
});

type Props = { children: ReactNode };

export const CartProvider = ({ children }: Props) => {
  const { mutateAsync } = useGetCart();
  const { data: session } = useSession();
  const [cart, setCart] = useState<ProductType[]>([]);

  useEffect(() => {
    const userCart = async () => {
      if (!session?.user) return;
      const response = await mutateAsync(session?.user?.id);

      setCart(response.data);
    };
    userCart();
  }, [session?.user, mutateAsync]);

  const values = { cart, setCart };
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useUserCart = () => {
  return useContext(CartContext);
};
