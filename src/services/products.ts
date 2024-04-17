"use client";

import { useMutation } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function useProductsByCategory() {
  return useMutation({
    mutationFn: async (payload: { category: string }) => {
      const response = await fetch(`${baseURL}/api/categoryproduct?category=${payload.category}`, {
        method: "GET",
      });

      return response.json();
    },
  });
}

export function useProductById() {
  return useMutation({
    mutationFn: async (payload: { id: string }) => {
      const response = await fetch(`${baseURL}/api/productById?id=${payload.id}`, {
        method: "GET",
      });

      return response.json();
    },
  });
}

export function useAllProducts() {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${baseURL}/api/all-products`, { method: "GET" });
      return response.json();
    },
  });
}
