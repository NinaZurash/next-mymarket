"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, CirclePlus, Heart, Mail, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "./ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setShowUserMenu(!showUserMenu); // Toggle menu visibility
  };

  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-s-zinc-200 bg-white py-2">
      <Link href="/">
        <Image
          alt="tracer-logo"
          src="/assets/mymarket.png"
          className="ml-16 py-5"
          width={150}
          height={150}
        />
      </Link>
      <div className="mr-28 flex items-center gap-6">
        <Link
          className="flex items-center gap-2 rounded-xl bg-[#fff3cc] px-7 py-3 text-sm font-semibold transition-colors duration-500 ease-in-out hover:bg-[#FFEFB2]"
          href="/"
        >
          <CirclePlus size={20} color="#fec900" />
          დამატება
        </Link>
        <Mail />
        <Heart />
        <ShoppingCart />
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
          {session?.user.image ? (
            <Image
              src={session.user.image}
              alt="user image"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <Image
              src={"/assets/icons8-user.gif"}
              alt="user image"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <span className="text-sm">{session?.user.email}</span>
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
