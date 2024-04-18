"use client";

import { useGetWishlist } from "@/services/wishlist";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { ProductType } from "@/types/globalTypes";

type WishlistContextType = {
  wishlist: ProductType[];
  setWishlist: (wishlist: ProductType[]) => void;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  setWishlist: () => null,
});

type Props = { children: ReactNode };

export const WishlistProvider = ({ children }: Props) => {
  const { mutateAsync } = useGetWishlist();
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  useEffect(() => {
    const userWishlist = async () => {
      if (!session?.user) return;
      const response = await mutateAsync(session?.user?.id);
      setWishlist(response.data);
    };
    userWishlist();
  }, [session?.user, mutateAsync]);

  const values = { wishlist, setWishlist };
  return <WishlistContext.Provider value={values}>{children}</WishlistContext.Provider>;
};

export const useUserWishlist = () => {
  return useContext(WishlistContext);
};
