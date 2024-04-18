"use client";

import { useProductToCart } from "@/services/cart";
import { useProductById } from "@/services/products";
import { useProductToWishlist } from "@/services/wishlist";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

import { useUserCart } from "@/providers/CartProvider";
import { useUserWishlist } from "@/providers/WishlistProvider";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Product } from "./HomeProducts";

export default function ProductPage({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const { mutateAsync } = useProductById();

  const { mutateAsync: mutateWishlist } = useProductToWishlist();
  const { wishlist, setWishlist } = useUserWishlist();

  const { mutateAsync: mutateCart } = useProductToCart();
  const { cart, setCart } = useUserCart();

  const [product, setProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  useEffect(() => {
    const getProduct = async () => {
      const response = await mutateAsync({ id: productId });
      setProduct(response.product);
    };
    getProduct();
  }, []);

  if (!product)
    return (
      <div className="m-10 flex items-center justify-center border p-4 ">
        <h1>Loading...</h1>
      </div>
    );

  const addToWishlist = async () => {
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

  const addToCart = async () => {
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

  const isNotAddedToWishlist = wishlist.findIndex((item) => item.id === product.id) === -1;
  return (
    <div className="m-10 flex items-center p-4 ">
      <div className="flex h-[300px] w-[430px] rounded-lg border p-3">
        <div className="flex w-full items-center justify-center">
          <Image
            className="h-[300px] w-auto border-y"
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>

        <Heart
          onClick={addToWishlist}
          className={`${isNotAddedToWishlist ? "bg-[#f2f3f6] text-[#a9b2c5]" : "bg-[#ffd100] text-white"} absolute ml-[360px] size-9 rounded-full p-2 hover:cursor-pointer`}
        />
      </div>

      <div className="item flex w-[700px] flex-col gap-y-6 p-5 text-lg">
        <h1 className="w-full font-bold">{product.title}</h1>
        <hr></hr>
        <div className="flex items-center justify-between">
          <span>{product.price} ლ</span>
          <Button
            onClick={addToCart}
            className="text-md mr-8 flex items-center gap-2 rounded-lg  border border-yellow-200 bg-white p-8 text-yellow-500 hover:bg-yellow-100"
          >
            <span>დაამატე კალათაში</span> <ShoppingCart />
          </Button>
        </div>
        <hr></hr>
        <p className="text-sm">{product.description}</p>
      </div>
    </div>
  );
}
