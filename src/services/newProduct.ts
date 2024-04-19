"use client";

import { useMutation } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useCreateNewProduct() {
  return useMutation({
    mutationFn: async (payload: {
      userId: string;
      title: string;
      description: string;
      price: number;
      category: string;
      image: string;
    }) => {
      const response = await fetch(`${baseURL}/api/user-products/new-product`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      return response.json();
    },
  });
}

export function useGetMyProducts() {
  return useMutation({
    mutationFn: async (payload: { userId: string }) => {
      const response = await fetch(
        `${baseURL}/api/user-products/new-product/?userId=${payload.userId}`,
        {
          method: "GET",
        },
      );

      return response.json();
    },
  });
}
