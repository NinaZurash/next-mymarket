"use client";

import { useEffect, useRef, useState } from "react";
import GalleryImage from "./GalleryImage";

let imagesArr = [
  [
    "https://auth.tnet.ge/templates/assets/img/slider/myauto.png",
    "https://auth.tnet.ge/templates/assets/img/slider/mymarket.png",
    "https://auth.tnet.ge/templates/assets/img/slider/myhome.png",
    "https://auth.tnet.ge/templates/assets/img/slider/myparts.png",
  ],
  [
    "https://auth.tnet.ge/templates/assets/img/slider/vendoo.png",
    "https://auth.tnet.ge/templates/assets/img/slider/swoop-revers.png",
    "https://auth.tnet.ge/templates/assets/img/slider/livo.png",
    "https://auth.tnet.ge/templates/assets/img/slider/vendoo-revers.png",
  ],
];

const MAX_STEP = -310;

export default function PictureGallery() {
  const [step, setStep] = useState(MAX_STEP);
  const intervalRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStep((prev: number) => prev + 1);
    }, 20);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setStep((prev: number) => prev + 1);
    }, 20);
  };

  if (step === 0) {
    imagesArr[0].unshift(imagesArr[0].pop() as string);
    imagesArr[1].push(imagesArr[1].shift() as string);

    setStep(MAX_STEP);
  }

  return (
    <div
      className="flex flex-row ml-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="fixed flex justify-between gap-10 overflow-hidden">
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
    </div>
  );
}
