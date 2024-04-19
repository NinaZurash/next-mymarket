import Link from "next/link";
import { Settings2, ShoppingCart } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EmptyProducts() {
  return (
    <div className="relative mx-auto flex h-full w-auto flex-col items-center justify-center gap-3">
      <Settings2 className=" size-11 rounded-full bg-[#e8ebf0] px-3 text-[#8896ae]" />
      <div className="text-lg font-semibold">შენ არ გაქვს განცხადებები</div>

      <Link
        href={`${BASE_URL}/products/new`}
        className="mt-5 rounded-2xl bg-[#fec900] px-14 py-5 text-[15px] font-black text-white"
      >
        დაამატე განცხადება
      </Link>
    </div>
  );
}
