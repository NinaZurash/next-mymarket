import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EmptyCart() {
  return (
    <div className="relative mx-auto flex h-full w-auto flex-col items-center justify-center gap-3">
      <ShoppingCart className=" size-11 rounded-full bg-[#e8ebf0] px-3 text-[#8896ae]" />
      <div className="text-lg font-semibold">შენი კალათა ცარიელია</div>
      <div className="text-[15px] text-slate-400">
        გადახედე ონლაინ მაღაზიების განცხადებებს და დაამატე სასურველი ნივთები კალათაში
      </div>
      <Link
        href={`${BASE_URL}/`}
        className="mt-5 rounded-2xl bg-[#fec900] px-14 py-5 text-[15px] font-black text-white"
      >
        დაიწყე შოპინგი
      </Link>
    </div>
  );
}
