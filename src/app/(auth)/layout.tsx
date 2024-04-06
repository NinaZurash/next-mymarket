import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { table } from "console";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:gap-y-16 md:gap-y-[58px] pt-11 md:px-[50px] lg:px-[90px] w-[660px] border-r">
      <div className="flex justify-center items-center">
        <Image src="/assets/tnet.png" alt="logo" width={205} height={33} />
        <Select defaultValue="geo">
          <SelectTrigger className="ml-auto text-[15px] border-zinc-300 px-5 w-[140px]">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="geo">ქართული</SelectItem>
            <SelectItem value="eng">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {children}
    </div>
  );
}
