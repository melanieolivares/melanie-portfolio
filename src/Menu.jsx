import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import boopSfx from "../src/assets/click-21156.mp3";
import * as FramerConstants from "./framerlayoutids";

const links = [
  {
    name: "about",
    layoutId: FramerConstants.ABOUT_ID,
  },
  {
    name: "projects",
    layoutId: null,
  },
  {
    name: "contact",
    layoutId: null,
  },
];

const today = new Date();

export const Menu = () => {
  const [lastHoverIndex, setLastHoverIndex] = useState(0);
  const [play] = useSound(boopSfx, { volume: 0.25 });

  return (
    <>
      {today.getMonth() === 9 && today.getDate() == 31 && (
        <>
          <img
            src="../src/assets/1295590.svg"
            alt="cobweb"
            className="absolute -bottom-48 -left-48 w-3/12"
          />
          <img
            src="../src/assets/1777668.svg"
            alt="cobweb with spider"
            className="absolute  w-2/12 right-0"
          />
        </>
      )}
      <div className="text-white h-screen flex flex-col place-items-center place-content-center ">
        <div className="-mt-[100px]">
          <motion.h1
            className="text-8xl font-semibold"
            layout={true}
            layoutId={FramerConstants.TITLE_ID}
          >
            melanie olivares
          </motion.h1>
          <h2 className="text-4xl text-[#3993DD] font-light">
            a web developer
          </h2>
        </div>
        <nav className="text-center mt-[100px] text-white/850">
          <ul className=" flex flex-col place-content-center text-4xl place-items-center">
            {links.map((link, i) => {
              const linkComponent = (
                <Link to={`/${link.name}`}>{link.name}</Link>
              );
              return (
                <li
                  onMouseEnter={() => setLastHoverIndex(i)}
                  key={link.name}
                  className="mb-10 relative w-44 cursor-pointer"
                  onClick={() => play()}
                >
                  {lastHoverIndex === i && (
                    <motion.div
                      className="absolute -left-10 text-[#3993DD] font-medium"
                      transition={{
                        layout: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      }}
                      layoutId="arrow"
                    >
                      {">"}
                    </motion.div>
                  )}
                  {lastHoverIndex === i ? (
                    <motion.div
                      transition={{
                        repeat: Infinity,
                        duration: 1.75,
                      }}
                      key={link.name}
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
    </>
  );
};
