"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";

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
  const router = useRouter();
  const { toast } = useToast();
  return useMutation({
    onSuccess: (response) => {
      if (response && response.status === 201) {
        router.push(`${baseURL}/email-verification`);
        toast({
          title: "გილოცავთ",
          description: "თქვენ წარმატებით დარეგისტრირდით, გაიარეთ იმეილის ვერიფიკაცია",
        });
      } else {
        toast({
          title: "შეცდომა",
          description: "მომხმარებელი ამ ელფოსტით უკვე არსებობს",
          variant: "destructive",
        });
      }
    },
    onError: (err) => {
      toast({
        title: "შეცდომა",
        description: err.message,
        variant: "destructive",
      });
    },
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

      if (!response.ok) throw new Error(ERROR_CODES[response.status] || "შეცდომა");

      return response.json();
    },
  });
}

const ERROR_CODES: Record<string, string> = {
  "409": "მომხმარებელი ამ ელფოსტით უკვე არსებოს",
};
