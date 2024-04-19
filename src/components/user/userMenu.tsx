"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CirclePlus,
  Heart,
  List,
  LogOut,
  MessageSquare,
  Package,
  Plus,
  ShoppingCart,
  Tag,
  UserCog,
} from "lucide-react";

import { Button } from "../ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    signOut({ callbackUrl: `${BASE_URL}/` });
  };
  return (
    <div className="flex h-fit w-[380px] flex-col gap-4 rounded-xl border-[2px] border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Image
          width="96"
          height="96"
          className="w-12 border-neutral-200 "
          src="https://img.icons8.com/color/96/user-female-circle--v1.png"
          alt="user-female-circle--v1"
        />
        <div className="r flex flex-col">
          <div className="font-semibold">
            {session?.user.name ? session?.user.name : session?.user.username}
          </div>
          <div className="text-xs font-semibold text-blue-700">ID {session?.user?.id}</div>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col">
          <div className="text-sm text-zinc-500">ბალანსი</div>
          <div className="text-lg font-bold">0.00</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          შევსება{" "}
          <Link href={""}>
            <Plus size={20} className="rounded-sm bg-[#dbe1fe] p-1 font-bold text-blue-600" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Link href={""}>
          <div className="flex items-center gap-3 p-2  text-[15px] text-[#747888]">
            <CirclePlus size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae] " />
            განცხადების დამატება
          </div>
        </Link>
        <Link href={`${BASE_URL}/my-products`}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <List size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            ჩემი განცხადებები
          </div>
        </Link>
        <Link href={""}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <Tag size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            შემოსული შეთავაზებები
          </div>
        </Link>
        <Link href={""}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <MessageSquare size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            ჩემი წერილები
          </div>
        </Link>
        <hr />
        <Link href={""}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <Heart size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            ჩემი რჩეულები
          </div>
        </Link>
        <Link href={""}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <ShoppingCart size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            ჩემი კალათა
          </div>
        </Link>
        <Link href={""}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <Package size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            ჩემი შეკვეთები
          </div>
        </Link>
        <hr />
        <Link href={""}>
          <div className="flex items-center gap-3  p-2 text-[15px] text-[#747888]">
            <UserCog size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
            ანგარიშის რედაქტირება
          </div>
        </Link>

        <Button
          onClick={handleClick}
          className="items-center gap-3 self-start bg-white  p-2 text-start  text-[15px] text-[#747888] hover:bg-white"
        >
          <LogOut size={30} className="rounded-lg bg-[#f8f9fd] p-2 text-[#8896ae]" />
          გასვლა
        </Button>
      </div>
    </div>
  );
}
