"use client";

import SubmitButton from "@/components/form/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useResetPassword } from "@/services/auth/handleToken";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { mutateAsync, error } = useResetPassword();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const email = localStorage.getItem("email");
    console.log(email);
    if (!email) {
      toast({
        title: "Error",
        description: "სცადეთ მოგვიანებით",
        variant: "destructive",
      });
      return;
    }
    const response = await mutateAsync({
      password: values.password,
      email: email,
    });
    if (response.status === 200) {
      toast({
        title: "Success",
        description: "პაროლი წარმატებით შეიცვალა",
      });
      setTimeout(() => {
        router.push(`${BASE_URL}/sign-in`);
      }, 1000);
    } else {
      toast({
        title: "Error",
        description: "შეცდომა, მოგვიანებით სცადეთ",
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-7 ">
        <h1 className="font-bold text-[28px]">ახალი პაროლის შექმნა</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="ახალი პაროლი"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="გაიმეორეთ პაროლი"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SubmitButton title="გაგრძელება" />
        </form>
        <Link
          className="ml-auto p-3 text-sky-600 hover:text-sky-800"
          href={`${BASE_URL}/sign-in`}
        >
          დაბრუნება
        </Link>
      </div>
    </Form>
  );
}
