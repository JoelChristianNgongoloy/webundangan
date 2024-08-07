"use client";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import fotoSintaCover from "../public/fotoSintaBaru.jpg";
import Time from "./components/Time";
import Doa from "./components/doa";
import Pengantin from "./components/Pengantin";
import Date from "./components/Date";
import Rsvp from "./components/RSVP";
import Galery from "./components/Galery";
import imagePage from "../public/Page1/cover.jpg";
import LoveStory from "./components/LoveStory";

export default function Home() {
  const undanganRef = useRef(null);
  const controls = useAnimation();
  const [undanganOpened, setUndanganOpened] = useState(false);

  const handleClickBukaUndangan = () => {
    const deviceType = getDeviceType();
    let yValue = -1000;

    if (deviceType === "ipad") {
      yValue = -1500; // Nilai untuk iPad
    }

    controls.start({ y: yValue });
    undanganRef.current.scrollIntoView({ behavior: "smooth" });
    setUndanganOpened(true);
  };

  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return "hp";
    } else if (width >= 768 && width < 1024) {
      return "ipad";
    } else {
      return "desktop";
    }
  };

  useEffect(() => {
    const handleResize = () => {
      controls.set({ y: getDeviceType() === "ipad" ? -1500 : -1000 });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [controls]);

  return (
    <div className="h-auto">
      <div className="hidden md:flex md:justify-center md:h-screen md:items-center lg:flex lg:justify-center lg:h-screen lg:items-center bg-pink-200">
        <p className="text-black text-5xl font-dancing font-semibold">
          Harus Buka di Device lebih kecil yah
        </p>
      </div>
      <motion.div
        className="flex h-screen flex-col absolute inset-0 shadow-2xl"
        animate={controls}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.div
          className="lg:hidden md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <Image
            src={imagePage}
            alt="cover sinta"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-10 brightness-50"
          />
        </motion.div>
        <div className="justify-center flex items-center">
          <div className="lg:hidden md:hidden block mt-48 absolute bottom-10 md:bottom-80 z-20">
            <motion.div
              className="text-center"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="font-dancing font-semibold text-4xl">
                Garry & Kezia
              </p>
              <p className="font-medium font-serif text-sm">
                Kepada Bapak/Ibu/Saudara/i
              </p>
              <div
                className="py-2 bg-pinkLight mt-5 rounded-lg text-white cursor-pointer"
                onClick={handleClickBukaUndangan}
              >
                <p className="font-bold font-playfair text-lg">Buka Undangan</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div ref={undanganRef}>
        {undanganOpened && (
          <div>
            <Time />
            <Doa />
            <Pengantin />
            <Date />
            <Rsvp />
            <Galery />
            <LoveStory />
          </div>
        )}
      </div>
    </div>
  );
}
