"use client";

import { sign } from "crypto";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";

import GoogleSignInButton from "../GoogleSignInButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "./SubmitButton";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const SignInForm = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const user = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (!user || user?.error) {
      return toast({
        title: "Error",
        description: "ელფოსტა ან პაროლი არასწორია",
        variant: "destructive",
      });
    } else {
      // await update();
      if (session && session.user.emailVerified) return router.push(`${BASE_URL}/`);
      localStorage.setItem("email", values.email);
      router.push(`${BASE_URL}/email-verification`);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-8 ">
        <h1 className="text-[35px] font-bold">ავტორიზაცია</h1>
        <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="h-14" placeholder="ელფოსტა" {...field} />
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
                    <Input className="h-14" type="password" placeholder="პაროლი" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-right text-[17px] font-medium text-slate-700">
            <Link href="/forgot-password">პაროლის აღდგენა</Link>
          </div>
          <SubmitButton title="შესვლა" />
        </form>

        <div className="flex items-center justify-center gap-4">
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
        </div>
        <p className="flex justify-center gap-x-2 text-center text-lg text-gray-400">
          <span> არ გაქვს ანგარიში?</span>
          <Link className="text-blue-500 hover:underline" href="/sign-up">
            - შექმენი
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignInForm;
