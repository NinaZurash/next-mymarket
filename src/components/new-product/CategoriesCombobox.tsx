"use client";

import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CATEGORIES } from "../products/CategoriesList";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  category: string;
  setCategory: (category: string) => void;
};
export function CategoriesCombobox({ category, setCategory }: Props) {
  const [open, setOpen] = useState(false);

  const selectedValue = Object.entries(CATEGORIES).find(
    ([key, { title, image }]) => key === category,
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg p-5"
        >
          {category && selectedValue ? selectedValue[1].title : "აირჩიე/ჩაწერე კატეგორია"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[540px] p-0">
        <Command>
          <CommandInput placeholder="აირჩიე/ჩაწერე კატეგორია" className="h-9" />
          <CommandList>
            <CommandEmpty>არ მოიძებნა.</CommandEmpty>
            <CommandGroup>
              {Object.entries(CATEGORIES).map(([key, { title, image }]) => (
                <CommandItem
                  key={key}
                  value={key}
                  onSelect={(currentValue) => {
                    setCategory(currentValue === category ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {title}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      category === key ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
