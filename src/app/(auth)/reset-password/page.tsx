"use client";

import GoogleSignInButton from "@/components/GoogleSignInButton";
import { Button } from "@/components/ui/button";
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
import { z } from "zod";
import Link from "next/link";

const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

const ResetPasswordForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {};

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
          </div>
          <Button
            className="w-full rounded-full bg-blue-500 text-lg p-7"
            type="submit"
          >
            გაგზავნა
          </Button>
        </form>
        <Link
          className="ml-auto p-3 text-sky-600 hover:text-sky-800"
          href="/sign-in"
        >
          დაბრუნება
        </Link>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
