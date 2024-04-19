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

export function CategoriesCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedValue = Object.entries(CATEGORIES).find(([key, { title, image }]) => key === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-lg p-5"
        >
          {value && selectedValue ? selectedValue[1].title : "აირჩიე/ჩაწერე კატეგორია"}
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
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {title}
                  <CheckIcon
                    className={cn("ml-auto h-4 w-4", value === key ? "opacity-100" : "opacity-0")}
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
