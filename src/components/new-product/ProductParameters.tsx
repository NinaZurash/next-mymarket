"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
});

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductParameters() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });
  return (
    <div className="mt-6 flex w-[600px] flex-col gap-4 rounded-3xl bg-white p-8">
      <div className="text- font-semibold">ძირითადი მახასიათებლები</div>
      <Form {...form}>
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
                <Input className="last: h-40 justify-start rounded-xl" placeholder="" {...field} />
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
            className="h-12 w-[100px] rounded-xl bg-white p-4 text-slate-600 hover:bg-transparent hover:underline "
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
      </Form>
    </div>
  );
}
