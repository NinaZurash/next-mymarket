"use client";

import { useCreateUser } from "@/services/auth/createUser";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";

import GoogleSignInButton from "../GoogleSignInButton";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "./SubmitButton";

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
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    localStorage.setItem("email", values.email);

    const response = await mutateAsync(values);

    if (response && response.status === 201) {
      router.push(`${BASE_URL}/email-verification`);
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
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-5 ">
        <h1 className="text-[33px] font-bold">ანგარიშის შექმნა</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
                    <Input placeholder="გაიმეორე პაროლი" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <SubmitButton title="რეგისტრაცია" />
        </form>
        <div className="flex items-center justify-center gap-4">
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
        </div>
        <p className="flex justify-center gap-2 pb-6 pt-2 text-center text-gray-600">
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
