import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import boopSfx from "../src/assets/click-21156.mp3";

const links = ["about", "projects", "contact"];

export const Menu = () => {
  const [lastHoverIndex, setLastHoverIndex] = useState(0);
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <div className="text-white h-screen flex flex-col place-items-center place-content-center ">
      <div className="-mt-[100px]">
        <h1 className="text-8xl font-medium">melanie olivares</h1>
        <h2 className="text-4xl text-[#3993DD] font-extralight">
          web developer
        </h2>
      </div>
      <nav className="text-center mt-[100px] text-white/850">
        <ul className=" flex flex-col place-content-center text-4xl place-items-center">
          {links.map((link, i) => {
            const linkComponent = <Link to={`/${link}`}>{link}</Link>;
            return (
              <li
                onMouseEnter={() => setLastHoverIndex(i)}
                key={link}
                className="mb-10 relative w-44 cursor-pointer"
                onClick={() => play()}
              >
                {lastHoverIndex === i && (
                  <div className="absolute -left-10 text-[#3993DD] font-medium">
                    {">"}
                  </div>
                )}
                {lastHoverIndex === i ? (
                  <motion.div
                    transition={{
                      repeat: Infinity,
                      duration: 1.75,
                    }}
                    key={link}
                    animate={{ opacity: [100, 0, 100] }}
                  >
                    {linkComponent}
                  </motion.div>
                ) : (
                  linkComponent
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

//#3A7CA5
//#2667FF
//#3993DD
//#1C77C3
//#23B5D3
//#30C5FF
//#040F16
//#04080F -
//#0C0910
//#0D1321
//#3C3C3C
//#393434
//#1A1D1A
//#333333
