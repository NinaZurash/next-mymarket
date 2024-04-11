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
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import SubmitButton from "./SubmitButton";
import { Facebook, Github } from "lucide-react";
import { ToastAction } from "@radix-ui/react-toast";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const SignInForm = () => {
  const { data: session } = useSession();
  
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


  const onSubmit = async (values: z.infer<typeof FormSchema >) => {
    
    const signInData = await signIn("credentials", { 
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "ელფოსტა ან პაროლი არასწორია",
        variant: "destructive",
      });
    }
    if (!session?.user?.emailVerified) {
      localStorage.setItem("email", values.email);
      toast({
        action: <ToastAction altText="Try again">
          <div className="flex gap-2 text-sm">
          <span className="items-start">გაიარე ვერიფიკაცია რომ განაგრძო</span>
          <Button className="border bg-white text-stone-900 hover:bg-slate-100" onClick={() => router.push(`${BASE_URL}/email-verification`)}>ლესგო!</Button>
          </div>
        </ToastAction>,
      
      })
      return;
    }


     
      router.refresh();
      router.push("/");
    
  };

  return (
    <Form {...form}>
      <div className="flex flex-col gap-y-8 ">
        <h1 className="font-bold text-[35px]">ავტორიზაცია</h1>
        <form
          className="flex flex-col gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                    <Input
                      className="h-14"
                      type="password"
                      placeholder="პაროლი"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="text-[17px] font-medium text-slate-700 text-right">
            <Link href="/forgot-password">პაროლის აღდგენა</Link>
          </div>
          <SubmitButton title="შესვლა" />
        </form>

        <div className="flex gap-4 justify-center items-center">
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
          <GoogleSignInButton>Google</GoogleSignInButton>
        </div>
        <p className="text-center justify-center gap-x-2 flex text-lg text-gray-400">
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
