"use client";

import { useProductToCart } from "@/services/cart";
import { useProductToWishlist } from "@/services/wishlist";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";

import { ProductType } from "@/types/globalTypes";
import { useUserCart } from "@/providers/CartProvider";
import { useUserWishlist } from "@/providers/WishlistProvider";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { CATEGORIES } from "./CategoriesList";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CartProductCard({ product }: { product: ProductType }) {
  const { cart, setCart } = useUserCart();
  const { data: session } = useSession();
  const { toast } = useToast();
  const { mutateAsync: mutateCart } = useProductToCart();
  const isInCart = cart.some((item) => item.id === product.id);

  const removeFromCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!session?.user || session?.user?.id === undefined) {
      return toast({
        title: "შეცდომა",
        description: "გთხოვთ სცადეთ მოგვიანებით",
        variant: "destructive",
      });
    }

    const response = await mutateCart({
      productId: product.id,
      userId: session.user.id,
    });
    setCart(response.cart);
  };
  return (
    <div className=" flex  w-full gap-4 rounded-lg bg-white p-5 ">
      <Link className="flex gap-4" href={`${BASE_URL}/products/${product.id}`}>
        <Image
          className="h-[200px] w-[250px] rounded-md object-cover "
          src={product.image}
          width={350}
          height={300}
          alt={product.title}
        />
      </Link>
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-7">
          <div className="font-semibold">{product.title}</div>
          <div className="text-sm text-slate-400">{CATEGORIES[product.category].title}</div>
          <div className="flex  font-semibold">{product.price} ლ</div>
        </div>
        {/* <div className="flex items-center">
          <Button className="rounded-none">-</Button>
          <Input
            className="h-10 w-4 rounded-none text-sm focus-visible:ring-0"
            type="text"
            value="1"
          />
          <Button className="rounded-none">+</Button>
        </div> */}
        <div className="flex w-full justify-end">
          <Button
            onClick={removeFromCart}
            className="bg-transparent text-[#ffc60b] hover:bg-transparent hover:text-[#ffad1e]"
          >
            პროდუქტის წაშლა
            <Trash2 size={14} className="m-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
