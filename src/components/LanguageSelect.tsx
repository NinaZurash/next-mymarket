import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function LanguageSelect() {
  return (
    <Select defaultValue="geo">
      <SelectTrigger className="ml-auto text-[15px] border-zinc-300 px-5 w-[140px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="geo">ქართული</SelectItem>
        <SelectItem value="eng">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
