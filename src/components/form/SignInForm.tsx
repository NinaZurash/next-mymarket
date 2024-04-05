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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-10 ">
        <h1 className="font-bold text-4xl">ავტორიზაცია</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
          </div>
          <div className="text-lg font-semibold text-slate-700 text-right p-4">
            <Link href="/forgot-password">პაროლის აღდგენა</Link>
          </div>
          <Button
            className="w-full mt-6 rounded-full bg-blue-500 text-lg p-7"
            type="submit"
          >
            შესვლა
          </Button>
        </form>
        {/* <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
        <p className="text-center gap-x-2 flex text-lg text-gray-400 mt-2">
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
