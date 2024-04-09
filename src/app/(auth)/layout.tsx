import LanguageSelect from "@/components/LanguageSelect";
import PictureGallery from "@/components/form/pictureGallery";

import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex flex-col lg:gap-y-16 md:gap-y-[58px] pt-11 md:px-[50px] lg:px-[90px] w-[660px] ">
        <div className="flex justify-center items-center">
          <Image src="/assets/tnet.png" alt="logo" width={205} height={33} />
          <LanguageSelect />
        </div>

        {children}
      </div>
      <div className="flex w-6 h-[100vh] border-r border-slate-100"></div>
      <PictureGallery />
    </div>
  );
}
