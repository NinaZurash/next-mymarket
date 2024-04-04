import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-14 py-14 px-20 w-[660px]">
      <Image src="/assets/tnet.png" alt="logo" width={200} height={200} />
      {children}
    </div>
  );
}
