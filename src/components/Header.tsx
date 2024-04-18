import Link from "next/link";

export default function Header() {
  return (
    <div className="mt-[100px] flex w-full items-center justify-between border-b border-slate-100 px-24 py-5 text-sm ">
      <div className="flex gap-7 ">
        <Link className="hover:text-[#ffd100]" href={""}>
          მეორადი განვადებით
        </Link>
        <Link className="hover:text-[#ffd100]" href={""}>
          Trade in
        </Link>
        <Link className="hover:text-[#ffd100]" href={""}>
          მაღაზიები
        </Link>
        <Link className="hover:text-[#ffd100]" href={""}>
          ჩემით წავიღებ
        </Link>
      </div>
      <div className="flex gap-7">
        <Link className="hover:text-[#ffd100]" href={""}>
          მეორადი განვადებით
        </Link>
        <Link className="hover:text-[#ffd100]" href={""}>
          Trade in
        </Link>
        <Link className="hover:text-[#ffd100]" href={""}>
          მაღაზიები
        </Link>
        <Link className="hover:text-[#ffd100]" href={""}>
          ჩემით წავიღებ
        </Link>
      </div>
    </div>
  );
}
