import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0 flex items-center justify-between">
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
          className="bg-[#fff3cc] hover:bg-[#FFEFB2] transition-colors duration-500 ease-in-out text-sm font-semibold px-7 py-2 rounded-xl flex gap-2 items-center"
          href="/"
        >
          <CirclePlus size={20} color="#fec900" />
          დამატება
        </Link>
        <Mail />
        <Heart />
        <ShoppingCart />
        {session?.user ? (
          <Button className="bg-white text-slate-950 hover:bg-gray-100 flex gap-x-1 border px-4 py-2 rounded-xl transition-colors duration-500 ease-in-out">
            <User size={23} />
            {session.user.username}
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
        {/* {session?.user ? (
          <UserAccountnav />
        ) : (
          <Link className={buttonVariants()} href="/sign-in">
            Sign in
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
