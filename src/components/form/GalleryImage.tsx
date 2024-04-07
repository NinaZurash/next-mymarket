import Image from "next/image";

export default function GalleryImage({
  src,
  position,
}: {
  src: string;
  position: number;
}) {
  return (
    <Image
      style={{ transform: `translateY(${position}px)` }}
      className="rounded-2xl"
      src={src}
      width={300}
      height={300}
      alt="myparts"
    />
  );
}
