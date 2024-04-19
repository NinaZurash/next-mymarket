"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export type CategoriesType = {
  [key: string]: {
    title: string;
    image: string;
  };
};

export const CATEGORIES: CategoriesType = {
  "mobiluri-telefoni": {
    title: "მობილური ტელეფონი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/279.jpg",
  },
  "satamasho-konsoli": {
    title: "სათამაშო კონსოლი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/283.jpg",
  },
  noutbuki: {
    title: "ნოუთბუქი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/287.jpg",
  },
  dzagli: {
    title: "ძაღლი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/291.jpg",
  },
  velosipedebi: {
    title: "ველოსიპედი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/295.jpg",
  },
  satsoli: {
    title: "საწოლი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/299.jpg",
  },
  saatebi: {
    title: "საათები",
    image: "https://static.my.ge/mymarket/sections/tabs/images/303.jpg",
  },
  pexsatsmeli: {
    title: "ფეხსაცმელი",
    image: "https://static.my.ge/mymarket/sections/tabs/images/307.jpg",
  },
  satamashoebi: {
    title: "სათამაშოები",
    image: "https://static.my.ge/mymarket/sections/tabs/images/311.jpg",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
      className="flex items-center justify-center space-x-4 bg-white "
    >
      <ChevronLeft
        width={50}
        height={50}
        className={`${
          hovered ? "visible" : "invisible"
        } absolute left-28 rounded-full bg-white p-4 shadow-md`}
      />
      <div className="flex h-28 w-36 flex-none flex-col items-center justify-center rounded-lg bg-[#333] text-white">
        <MenuIcon className="text-3xl" />
        <span className="mt-2">კატეგორიები</span>
      </div>
      <div className="no-scrollbar flex  w-full touch-pan-y gap-3 overflow-x-auto overflow-y-hidden">
        {Object.entries(CATEGORIES).map(([category, { title, image }]) => {
          return (
            <div key={title} className="relative">
              <Link href={`${BASE_URL}/categories/${category}`} className="hover:cursor-pointer">
                <div className="flex h-28 w-40 flex-none rounded-2xl">
                  <Image
                    className=" transition-all duration-300 ease-in-out hover:scale-110"
                    src={image}
                    alt={title}
                    width={160}
                    height={96}
                  />
                </div>
                <span className="absolute left-0 top-0 w-full p-2 text-[15px] font-semibold text-black">
                  {title}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      <ChevronRight
        width={50}
        height={50}
        className={`${
          hovered ? "visible" : "invisible"
        } t absolute right-24 rounded-full bg-white p-4 shadow-md`}
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
