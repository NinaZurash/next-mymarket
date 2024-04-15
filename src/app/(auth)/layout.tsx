import Image from "next/image";

import PictureGallery from "@/components/form/pictureGallery";
import LanguageSelect from "@/components/LanguageSelect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex w-[660px] flex-col pt-11 md:gap-y-[58px] md:px-[50px] lg:gap-y-16 lg:px-[90px] ">
        <div className="flex items-center justify-center">
          <Image src="/assets/tnet.png" alt="logo" width={205} height={33} />
          <LanguageSelect />
        </div>

        {children}
      </div>

      <div className="flex w-6 border-r border-slate-100"></div>
      <PictureGallery />
    </div>
  );
}
