"use client";

import { useMutation } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type VerifyEmailPayloadT = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
};
export function useCreateUser() {
  return useMutation({
    mutationFn: async (payload: VerifyEmailPayloadT) => {
      const response = await fetch(`${baseURL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          username: payload.username,
          password: payload.password,
          confirmPassword: payload.confirmPassword,
        }),
      });

      return response.json();
    },
  });
}
