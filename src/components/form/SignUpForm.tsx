"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "./SubmitButton";
import { useCreateUser } from "@/services/auth/createUser";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const userSchema = z
  .object({
    firstName: z.string().min(1, "Firstname is required").max(100),
    lastName: z.string().min(1, "Lastname is required").max(100),
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync, error } = useCreateUser();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    localStorage.setItem("email", values.email);
    router.push(`${BASE_URL}/email-verification`);

    const response = await mutateAsync(values);

    if (response.status === 201 && response) {
      toast({
        title: "გილოცავთ",
        description:
          "თქვენ წარმატებით დარეგისტრირდით, გთხოვთ შეამოწმოთ თქვენი ელ. ფოსტა",
      });
    } else {
      toast({
        title: "შეცდომა",
        description: "რეგისტრაცია ვერ ხერხდება",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-5 ">
        <h1 className="font-bold text-[33px]">ანგარიშის შექმნა</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="სახელი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="გვარი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="ელფოსტა" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="მომხმარებლის სახელი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="პაროლი" {...field} />
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
                      placeholder="გაიმეორე პაროლი"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SubmitButton title="რეგისტრაცია" />
        </form>
        <div className="flex gap-4 justify-center items-center">
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
        </div>
        <p className="text-center flex justify-center gap-2 pb-6 pt-2 text-gray-600">
          არსებული ანგარიშით
          <Link className="text-blue-500 hover:underline" href="/sign-in">
            შესვლა
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
