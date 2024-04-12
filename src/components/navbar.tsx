"use client";

import Link from "next/link";

import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import {
  ChevronDown,
  CirclePlus,
  Heart,
  Mail,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar () {
  const[showUserMenu, setShowUserMenu] = useState(false)
  const {data:session} =  useSession();

  const toggleMenu = () => {
    setShowUserMenu(!showUserMenu); // Toggle menu visibility
  };
  
  
  return (
    <div className="bg-white py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 flex items-center justify-between">
      <Link href="/">
        <Image
          alt="tracer-logo"
          src="/assets/mymarket.png"
          className="py-5 ml-16"
          width={150}
          height={150}
        />
      </Link>
      <div className="flex items-center mr-28 gap-6">
        <Link
          className="bg-[#fff3cc] hover:bg-[#FFEFB2] transition-colors duration-500 ease-in-out text-sm font-semibold px-7 py-3 rounded-xl flex gap-2 items-center"
          href="/"
        >
          <CirclePlus size={20} color="#fec900" />
          დამატება
        </Link>
        <Mail />
        <Heart />
        <ShoppingCart />
        {session?.user ? (
          <Button onClick={toggleMenu} className="bg-white text-slate-950 hover:bg-gray-100 flex gap-x-1 border px-4 py-2 rounded-xl transition-colors duration-500 ease-in-out">
            <User size={23} />
            {session.user.name ? session.user.name?.split(" ")[0]: session.user.username}
            <ChevronDown size={13} />
          </Button>
        ) : (
          <Link
            className="flex gap-x-3 border px-4 py-2 rounded-xl"
            href="/sign-in"
          >
            <User size={23} />
            შესვლა
          </Link>
        )}
      </div>
      <div id="userMenu" className={`flex flex-col absolute gap-4 py-3 rounded-lg bg-white w-[260px] shadow-[0_6px_18px_0_rgba(0,0,0,0.2)] right-28 top-20  ${showUserMenu ? 'block' : 'hidden'}`}>
        <div className="flex items-center p-4">
        { session?.user.image ? <Image src={session.user.image} alt="user image" width={50} height={50} className="rounded-full" /> : <Image src={'/assets/icons8-user.gif'} alt="user image" width={50} height={50} className="rounded-full" />}
          <span className="text-sm">{session?.user.email}</span>
        </div>
        <div className="w-full border border-t-gray-100"></div>
        <Button className="px-5 bg-white hover:bg-white text-slate-500 font-medium" onClick={()=>{signOut()}}>
        გასვლა
        </Button> 
      </div>
    </div>
  );
};


