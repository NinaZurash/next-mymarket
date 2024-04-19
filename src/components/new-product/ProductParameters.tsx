"use client";

import { z } from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export default function ProductParameters() {
  return (
    <div className="mt-6 flex w-[600px] flex-col gap-4 rounded-3xl bg-white p-8">
      <div className="text- font-semibold">ძირითადი მახასიათებლები</div>
    </div>
  );
}
