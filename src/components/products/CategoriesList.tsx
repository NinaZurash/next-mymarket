"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const CATEOGRIES_IMAGES = {
  "მობილური ტელეფონი":
    "https://static.my.ge/mymarket/sections/tabs/images/279.jpg",
  "სათამაშო კონსოლი":
    "https://static.my.ge/mymarket/sections/tabs/images/283.jpg",
  ნოუთბუქი: "https://static.my.ge/mymarket/sections/tabs/images/287.jpg",
  ძაღლი: "https://static.my.ge/mymarket/sections/tabs/images/291.jpg",
  ველოსიპედი: "https://static.my.ge/mymarket/sections/tabs/images/295.jpg",
  საწოლი: "https://static.my.ge/mymarket/sections/tabs/images/299.jpg",
  საათები: "https://static.my.ge/mymarket/sections/tabs/images/303.jpg",
  ფეხსაცმელი: "https://static.my.ge/mymarket/sections/tabs/images/307.jpg",
  სათამაშოები: "https://static.my.ge/mymarket/sections/tabs/images/311.jpg",
};

export default function CategoriesList() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="flex space-x-4 bg-white justify-center items-center "
    >
      <ChevronLeft
        width={50}
        height={50}
        className={`${
          hovered ? "visible" : "invisible"
        } absolute left-28 p-4 bg-white shadow-md rounded-full`}
      />
      <div className="flex-none w-36 h-28 bg-[#333] rounded-lg flex flex-col justify-center items-center text-white">
        <MenuIcon className="text-3xl" />
        <span className="mt-2">კატეგორიები</span>
      </div>
      <div className="flex gap-3  touch-pan-y overflow-x-auto overflow-y-hidden no-scrollbar w-full">
        {Object.entries(CATEOGRIES_IMAGES).map(([category, image]) => (
          <div key={category} className="relative">
            <Link href={""} className="hover:cursor-pointer">
              <div className="flex flex-none w-40 h-28 rounded-2xl">
                <Image
                  className=" hover:scale-110 transition-all duration-300 ease-in-out"
                  src={image}
                  alt={category}
                  width={160}
                  height={96}
                />
              </div>
              <span className="absolute top-0 left-0 w-full p-2 text-black text-[15px] font-semibold">
                {category}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <ChevronRight
        width={50}
        height={50}
        className={`${
          hovered ? "visible" : "invisible"
        } t absolute right-24 p-4 bg-white shadow-md rounded-full`}
      />
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
