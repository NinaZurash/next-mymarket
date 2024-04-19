"use client";

import { useCreateNewProduct } from "@/services/newProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import UserMenu from "../user/userMenu";
import ProductDetails from "./ProductDetails";
import ProductParameters from "./ProductParameters";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const FormSchema = z.object({
  title: z.string().min(1, "შეიყვანეთ სათაური"),
  description: z.string().min(1, "შეიყვანეთ აღწერა"),
  price: z.string().min(1, "მიუთითეთ ფასი"),
});

export default function NewProduct() {
  const { data: session } = useSession();
  const { mutateAsync } = useCreateNewProduct();

  const [category, setCategory] = useState("");

  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    if (!session?.user) {
      return toast({
        title: "Error",
        description: "სცადეთ მოგვიანებით",
        variant: "destructive",
      });
    }
    const response = await mutateAsync({
      userId: session?.user.id,
      title: values.title,
      description: values.description,
      price: parseFloat(values.price),
      image: "https://www.mymarket.ge/beta/templates/assets/img/no-image.png",
      category: category,
    });
    console.log(response);
    if (response.error) {
      return toast({
        title: "Error",
        description: "შეცდომა, სცადეთ მოგვიანებით",
        variant: "destructive",
      });
    }
    toast({
      title: "Success",
      description: "განცხადება დაემატა",
      variant: "success",
    });
    router.push(`${BASE_URL}/categories/${category}`);
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-10">
      <div className="flex w-full gap-4 bg-[#f0f3f6] px-20 py-12">
        {session?.user ? <UserMenu /> : <div className="min-h-[30rem]"></div>}
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center">
            <Link href={`${BASE_URL}/`}>
              <span className="text-[13px] font-semibold text-gray-400">მთავარი </span>
            </Link>
            <ChevronRight size={14} className=" text-zinc-500" />
            <span className="text-[13px] font-semibold">განცხადების დამატება </span>
          </div>
          <div className="text-2xl font-black">განცხადების დამატება</div>
          <ProductDetails category={category} setCategory={setCategory} />

          <div className="mt-6 flex w-[600px] flex-col gap-4 rounded-3xl bg-white p-8">
            <div className="text- font-semibold">ძირითადი მახასიათებლები</div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        სათაური <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input className="h-12 rounded-xl" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        აღწერა <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="last: h-40 justify-start rounded-xl"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        მიუთითეთ ნივთის ფასი (ლარი) <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="last: h-14 w-40 justify-start rounded-lg"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <Link
                    href={`${BASE_URL}/`}
                    className="mt-2 h-12 w-[100px] rounded-xl bg-white p-4 text-slate-600 hover:bg-transparent hover:underline "
                  >
                    გაუქმება
                  </Link>
                  <Button
                    type="submit"
                    className="h-12 w-[200px] rounded-xl bg-amber-500 text-white hover:bg-amber-600"
                  >
                    გამოქვეყნება
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
