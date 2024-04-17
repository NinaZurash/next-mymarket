"use client";

import { useMutation } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useProductToWishlist() {
  return useMutation({
    mutationFn: async (payload: { productId: string; userId: string }) => {
      const response = await fetch(`${baseURL}/api/user-products/wishlist`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response.json();
    },
  });
}

export function useGetWishlist() {
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`${baseURL}/api/user-products/wishlist?userId=${userId}`, {
        method: "GET",
      });
      return response.json();
    },
  });
}
