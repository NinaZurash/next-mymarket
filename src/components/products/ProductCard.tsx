"use client";

import { useProductToWishlist } from "@/services/wishlist";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { ProductType } from "@/types/globalTypes";
import { useUserWishlist } from "@/providers/WishlistProvider";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductCard({ product }: { product: ProductType }) {
  const { wishlist, setWishlist } = useUserWishlist();
  const { data: session } = useSession();
  const { toast } = useToast();
  const { mutateAsync: mutateWishlist } = useProductToWishlist();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const removeFromWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session?.user || session?.user?.id === undefined) {
      return toast({
        title: "შეცდომა",
        description: "გთხოვთ სცადეთ მოგვიანებით",
        variant: "destructive",
      });
    }

    const response = await mutateWishlist({
      productId: product.id,
      userId: session.user.id,
    });
    setWishlist(response.wishlist);
  };
  return (
    <div className="flex w-60 flex-col  gap-5 rounded-lg bg-white p-4">
      <Link href={`${BASE_URL}/products/${product.id}`}>
        <Image
          className="h-[170px] w-[350px] rounded-md object-cover "
          src={product.image}
          width={350}
          height={300}
          alt={product.title}
        />
        <div className="flex flex-col gap-2">
          <div className="line-clamp-3 h-[90px] shrink-0">{product.title}</div>
          <hr className=""></hr>
          <div className="flex items-center justify-between font-semibold">
            {product.price} ლ{" "}
            <span>
              <Button
                onClick={removeFromWishlist}
                className="bg-transparent p-0 hover:bg-transparent"
              >
                <Heart
                  className={`${!isInWishlist ? "bg-[#f2f3f6] text-[#a9b2c5]" : "bg-[#ffd100] text-white"} p-2" size={30} rounded-lg p-1 hover:cursor-pointer`}
                />
              </Button>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
