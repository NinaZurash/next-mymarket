"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import Link from "next/link";
import SubmitButton from "@/components/form/SubmitButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForgotPassword, useResetToken } from "@/services/auth/handleToken";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  token: z.string().min(1, "Code is required"),
});

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ResetPasswordForm = () => {
  const router = useRouter();
  const { mutateAsync, error } = useForgotPassword();
  const { mutateAsync: checkToken } = useResetToken();
  const [isTokenSent, setIsTokenSent] = useState(false);

  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      token: undefined,
    },
  });

  const handleTokenChange = async (email: string) => {
    const data = await mutateAsync({ email: email });
    setIsTokenSent(true);
    const setTokenTimer = setTimeout(() => {
      setIsTokenSent(false);
    }, 60000);
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const tokenCode = parseInt(values.token);
    if (isNaN(tokenCode)) {
      toast({
        title: "შეცდომა",
        description: "კოდი უნდა იყოს ციფრებისგან შემდგარი",
        variant: "destructive",
      });
      return;
    }
    const data = await checkToken({
      email: values.email,
      token: tokenCode,
    });
    if (!data.isValid) {
      toast({
        title: "შეცდომა",
        description: "კოდი არასწორია",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("email", values.email);
    router.push(`${BASE_URL}/reset-password`);
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
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex border items-center justify-center rounded-lg">
                      <Input
                        className="m-1 border-none focus-visible:ring-transparent focus:ring-transparent"
                        placeholder="ერთჯერადი კოდი"
                        {...field}
                      />
                      <Button
                        type="button"
                        disabled={isTokenSent}
                        onClick={() => {
                          handleTokenChange(form.getValues().email);
                        }}
                        className="m-1 bg-[#eef6fe] text-[#2680eb] hover:cursor-pointer hover:bg-blue-200"
                      >
                        კოდის მიღება
                      </Button>
                    </div>
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
};

export default ResetPasswordForm;
