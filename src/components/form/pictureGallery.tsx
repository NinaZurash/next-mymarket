"use client";

import { set } from "zod";
import GalleryImage from "./GalleryImage";
import { useEffect, useState } from "react";

let imagesArr = [
  [
    "https://auth.tnet.ge/templates/assets/img/slider/myauto.png",
    "https://auth.tnet.ge/templates/assets/img/slider/mymarket.png",
    "https://auth.tnet.ge/templates/assets/img/slider/myhome.png",
    "https://auth.tnet.ge/templates/assets/img/slider/myparts.png",
  ],
  [
    "https://auth.tnet.ge/templates/assets/img/slider/vendoo.png",
    "https://auth.tnet.ge/templates/assets/img/slider/myhome.png",
    "https://auth.tnet.ge/templates/assets/img/slider/livo.png",
    "https://auth.tnet.ge/templates/assets/img/slider/vendoo-revers.png",
  ],
];

const MAX_STEP = -310;

export default function PictureGallery() {
  const [step, setStep] = useState(MAX_STEP);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev: number) => prev + 1);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  if (step === 0) {
    imagesArr[0].unshift(imagesArr[0].pop() as string);
    imagesArr[1].push(imagesArr[1].shift() as string);

    setStep(MAX_STEP);
  }
  return (
    <div className="flex justify-between flex-row gap-10 ml-16">
      <div className=" overflow-hidden relative">
        <div className="flex flex-col gap-5  transition-transform">
          {imagesArr[0].map((src, index) => (
            <GalleryImage key={index} src={src} position={step} />
          ))}
        </div>
      </div>
      <div className="overflow-hidden relative">
        <div className="flex flex-col gap-5  transition-transform">
          {imagesArr[1].map((src, index) => (
            <GalleryImage key={index} src={src} position={MAX_STEP - step} />
          ))}
        </div>
      </div>
    </div>
  );
}
