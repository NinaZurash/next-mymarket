import Link from "next/link";
import { Heart } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EmptyWishlist() {
  return (
    <div className="relative mx-auto flex h-full w-auto flex-col items-center justify-center gap-3">
      <Heart className="size-10 rounded-full bg-[#e8ebf0] p-3 text-[#8896ae]" />
      <div className="text-lg font-semibold">შენ არ გაქვს ფავორიტების სია</div>
      <div className="text-[15px] text-slate-400">
        ფავორიტებში დასამატებლად დააჭირეთ გულის ხატულას პროდუქტის ფოტოს მარჯვენა კუთხეში
      </div>
      <Link
        href={`${BASE_URL}/`}
        className="mt-5 rounded-2xl bg-[#fec900] px-14 py-5 text-[15px] font-black text-white"
      >
        სიის შექმნა
      </Link>
    </div>
  );
}
