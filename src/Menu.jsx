import { motion } from "framer-motion";
import { useState } from "react";

const links = ["about", "projects", "contact"];

export const Menu = () => {
  const [lastHoverIndex, setLastHoverIndex] = useState(0);

  return (
    <div className="text-white h-screen flex flex-col place-items-center place-content-center ">
      <div className="-mt-[100px]">
        <h1 className="text-8xl font-medium">melanie olivares</h1>
        <h2 className="text-4xl text-[#3A7CA5] font-extralight">
          web developer
        </h2>
      </div>
      <nav className="text-center mt-[100px] text-white/80">
        <ul className=" flex flex-col place-content-center text-4xl place-items-center">
          {links.map((link, i) => {
            return (
              <li
                onMouseEnter={() => setLastHoverIndex(i)}
                key={link}
                className="mb-10 relative w-44"
              >
                {lastHoverIndex === i && (
                  <div className="absolute -left-10 text-[#3A7CA5]">{">"}</div>
                )}
                {lastHoverIndex === i ? (
                  <motion.div
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                    key={link}
                    animate={{ opacity: [100, 0, 100] }}
                  >
                    {link}
                  </motion.div>
                ) : (
                  link
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
