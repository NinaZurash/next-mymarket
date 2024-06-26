"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CirclePlus, Heart, Mail, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

import { useUserCart } from "@/providers/CartProvider";
import { useUserWishlist } from "@/providers/WishlistProvider";

import { Button } from "./ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();

  const { wishlist } = useUserWishlist();
  const { cart } = useUserCart();

  const toggleMenu = () => {
    setShowUserMenu(!showUserMenu); // Toggle menu visibility
  };
  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-zinc-100 bg-white py-2">
      <Link href="/">
        <Image
          alt="tracer-logo"
          src="/assets/mymarket.png"
          className="ml-24 py-5"
          width={150}
          height={150}
        />
      </Link>
      <div className="mr-28 flex items-center gap-6">
        <Link
          className="flex items-center gap-2 rounded-xl bg-[#fff3cc] px-7 py-3 text-sm font-semibold transition-colors duration-500 ease-in-out hover:bg-[#FFEFB2]"
          href={`${BASE_URL}/products/new`}
        >
          <CirclePlus size={20} color="#fec900" />
          დამატება
        </Link>
        <Mail />

        <div className="flex items-center justify-center">
          <Link href={`${BASE_URL}/wishlist`}>
            <Heart name="wishlist" />
          </Link>
          <span
            className={`${!wishlist || wishlist.length === 0 ? "hidden" : ""} absolute mb-5 ml-6 w-5 rounded-full bg-[#ff641e] p-[3px] text-center text-[9px] text-white`}
          >
            {wishlist?.length || 0}
          </span>
        </div>
        <div className="flex items-center justify-center">
          <Link href={`${BASE_URL}/cart`}>
            <ShoppingCart />
          </Link>
          <span
            className={`${!cart || cart.length === 0 ? "hidden" : ""} absolute mb-5 ml-6 w-5 rounded-full bg-[#ff641e] p-[3px] text-center text-[9px] text-white`}
          >
            {cart?.length || 0}
          </span>
        </div>
        {session?.user ? (
          <Button
            onClick={toggleMenu}
            className="flex gap-x-1 rounded-xl border bg-white px-4 py-2 text-slate-950 transition-colors duration-500 ease-in-out hover:bg-gray-100"
          >
            <User size={23} />
            {session.user.name ? session.user.name?.split(" ")[0] : session.user.username}
            <ChevronDown size={13} />
          </Button>
        ) : (
          <Link className="flex gap-x-3 rounded-xl border px-4 py-2" href="/sign-in">
            <User size={23} />
            შესვლა
          </Link>
        )}
      </div>
      <div
        id="userMenu"
        className={`absolute right-28 top-20 flex w-[260px] flex-col gap-4 rounded-lg bg-white py-3 shadow-[0_6px_18px_0_rgba(0,0,0,0.2)]  ${showUserMenu ? "block" : "hidden"}`}
      >
        <div className="flex items-center p-4">
          <Image
            src={"/assets/icons8-user.gif"}
            alt="user image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="max-w-fit overflow-hidden overflow-ellipsis whitespace-nowrap text-sm">
            {session?.user.email}lkndslflkn
          </span>
        </div>
        <div className="w-full border border-t-gray-100"></div>
        <Button
          className="bg-white px-5 font-medium text-slate-500 hover:bg-white"
          onClick={() => {
            signOut();
          }}
        >
          გასვლა
        </Button>
      </div>
    </div>
  );
}
